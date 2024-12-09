import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Shield, 
  Database, 
  Cloud, 
  HardDrive, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  AlarmClock,
  Grid,
  Monitor,
  Network,
  Coffee,
  Activity,
  Settings
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '../../components/card/DashboardCard';
import axios from 'axios';

const calculateTimeRange = (timeRange) => {
  const to = Date.now();
  let from;
  
  switch(timeRange) {
    case '15m':
      from = to - 15 * 60 * 1000;
      break;
    case '30m':
      from = to - 30 * 60 * 1000;
      break;
    case '1h':
      from = to - 60 * 60 * 1000;
      break;
    case '3h':
      from = to - 3 * 60 * 60 * 1000;
      break;
    case '6h':
      from = to - 6 * 60 * 60 * 1000;
      break;
    case '1d':
      from = to - 24 * 60 * 60 * 1000;
      break;
    default:
      from = to - 60 * 60 * 1000;
  }
  
  return { from, to };
};

const useSystemMetrics = (environment, timeRange) => {
  const [metrics, setMetrics] = useState({
    nodes: '0',
    pods: '0',
    storage: '0',
    network: { in: '0', out: '0' }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const prometheusEndpoint = 'http://192.168.0.142:30090';
        const { from, to } = calculateTimeRange(timeRange);
        const timeParam = `[${Math.floor((to - from) / 1000)}s]`;

        const responses = await Promise.all([
          // 노드 수
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `count(kube_node_info)`
            }
          }),
          // Pod 수
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `count(kube_pod_info)`
            }
          }),
          // 스토리지 사용량
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(node_filesystem_size_bytes{mountpoint="/"} - node_filesystem_free_bytes{mountpoint="/"}) / sum(node_filesystem_size_bytes{mountpoint="/"}) * 100`
            }
          }),
          // 네트워크 IN
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_receive_bytes_total${timeParam}))`
            }
          }),
          // 네트워크 OUT
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_transmit_bytes_total${timeParam}))`
            }
          })
        ]);

        const formatBytes = (bytes) => {
          if (bytes === 0) return '0 B';
          const k = 1024;
          const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}/s`;
        };

        setMetrics({
          nodes: responses[0].data.data.result[0]?.value[1] || '0',
          pods: responses[1].data.data.result[0]?.value[1] || '0',
          storage: `${(responses[2].data.data.result[0]?.value[1] || 0).toFixed(1)}%`,
          network: {
            in: formatBytes(responses[3].data.data.result[0]?.value[1] || 0),
            out: formatBytes(responses[4].data.data.result[0]?.value[1] || 0)
          }
        });
      } catch (error) {
        console.error('Error fetching system metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, [environment, timeRange]);

  return metrics;
};


const useServiceHealth = (service, timeRange) => {
  const [health, setHealth] = useState({
    status: 'normal',
    uptime: '0%',
    metrics: {
      cpu: '0%',
      memory: '0/0GB',
      pods: '0/0',
      requests: '0/s'
    }
  });

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const prometheusEndpoint = 'http://192.168.0.142:30090';
        const { from, to } = calculateTimeRange(timeRange);
        const timeParam = `[${Math.floor((to - from) / 1000)}s]`;

        const responses = await Promise.all([
          // CPU 사용률
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(process_cpu_seconds_total{kubernetes_namespace="${service.namespace}"}${timeParam})) * 100`
            }
          }),
          // 메모리 사용량
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(container_memory_usage_bytes{namespace="${service.namespace}"}) / 1024 / 1024 / 1024`
            }
          }),
          // Pod Ready 상태
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(kube_pod_status_phase{namespace="${service.namespace}", phase="Running"})`
            }
          }),
          // 총 Pod 수
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `count(kube_pod_info{namespace="${service.namespace}"})`
            }
          }),
          // HTTP 요청량
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_receive_bytes_total{namespace="${service.namespace}"}${timeParam}))`
            }
          })
        ]);

        const cpu = responses[0].data.data.result[0]?.value[1] || 0;
        const memoryGB = responses[1].data.data.result[0]?.value[1] || 0;
        const readyPods = responses[2].data.data.result[0]?.value[1] || 0;
        const totalPods = responses[3].data.data.result[0]?.value[1] || 0;
        const requests = responses[4].data.data.result[0]?.value[1] || 0;

        setHealth({
          status: cpu > 80 || memoryGB > 85 ? 'warning' : 'normal',
          uptime: `${((readyPods / Math.max(totalPods, 1)) * 100).toFixed(1)}%`,
          metrics: {
            cpu: `${cpu.toFixed(1)}%`,
            memory: `${memoryGB.toFixed(1)}GB`,
            pods: `${readyPods}/${totalPods}`,
            requests: `${Math.round(requests)}/s`
          }
        });
      } catch (error) {
        console.error('Error fetching service health:', error, service.namespace);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, [service.namespace, timeRange]);

  return health;
};

const services = {
  onpremise: [
    {
      name: 'contractservice',
      displayName: '계약 서비스',
      type: 'Spring Boot',
      icon: Database,
      namespace: 'contractservice'
    },
    {
      name: 'walletservice',
      displayName: '지갑 서비스',
      type: 'Spring Boot',
      icon: HardDrive,
      namespace: 'walletservice'
    }
  ],
  cloud: [
    {
      name: 'userservice',
      displayName: '사용자 서비스',
      type: 'Spring Boot',
      icon: Cloud,
      namespace: 'userservice'
    },
    {
      name: 'startupservice',
      displayName: '스타트업 서비스',
      type: 'Spring Boot',
      icon: Activity,
      namespace: 'startupservice'
    },
    {
      name: 'coinservice',
      displayName: '코인 서비스',
      type: 'Spring Boot',
      icon: Settings,
      namespace: 'coinservice'
    },
    {
      name: 'frontend',
      displayName: '프론트엔드',
      type: 'React',
      icon: Monitor,
      namespace: 'frontend'
    }
  ]
};

const ServiceCard = ({ service, timeRange }) => {
  const health = useServiceHealth(service, timeRange);

  const getServiceDashboardUrl = () => {
    const { from, to } = calculateTimeRange(timeRange);
    return `http://192.168.0.142:32647/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&from=${from}&to=${to}&timezone=utc&var-datasource=default&var-cluster=&var-namespace=${service.namespace}&refresh=10s&panelId=7&__feature.dashboardSceneSolo`;
  };

  return (
    <Card className="bg-white relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        health.status === 'normal' ? 'bg-green-500' : 'bg-yellow-500'
      }`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <service.icon className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold">{service.displayName}</h3>
              <p className="text-sm text-gray-500">{service.type}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            health.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {health.status === 'normal' ? '정상' : '주의'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CPU</span>
              <span className="text-sm font-medium">{health.metrics.cpu}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm font-medium">{health.metrics.memory}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pods</span>
              <span className="text-sm font-medium">{health.metrics.pods}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Requests</span>
              <span className="text-sm font-medium">{health.metrics.requests}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">가용성</span>
          </div>
          <span className="text-lg font-bold">{health.uptime}</span>
        </div>

        <div className="mt-4 h-[200px]">
          <iframe
            src={getServiceDashboardUrl()}
            className="w-full h-full rounded-md"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
            referrerPolicy="no-referrer"
            frameBorder="0"
            title={`${service.displayName} Metrics`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const EnvironmentMetrics = ({ environment, timeRange }) => {
  const metrics = useSystemMetrics(environment, timeRange);

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          {environment === 'onpremise' ? (
            <>
              <Server className="mr-2 h-5 w-5" />
              온프레미스 인프라 현황
            </>
          ) : (
            <>
              <Cloud className="mr-2 h-5 w-5" />
              퍼블릭 클라우드 현황
            </>
          )}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {environment === 'onpremise' ? '물리 노드' : '워커 노드'}
            </span>
            <p className="text-2xl font-bold mt-1">{metrics.nodes}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">실행 중인 Pod</span>
            <p className="text-2xl font-bold mt-1">{metrics.pods}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {environment === 'onpremise' ? '스토리지' : 'EBS 볼륨'}
            </span>
            <p className="text-2xl font-bold mt-1">{metrics.storage}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">네트워크</span>
            <p className="text-sm mt-1">IN: {metrics.network.in}</p>
            <p className="text-sm">OUT: {metrics.network.out}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SystemMonitoring = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [timeRange, setTimeRange] = useState('1h');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getMainDashboardUrl = () => {
    const { from, to } = calculateTimeRange(timeRange);
    
    return `http://192.168.0.142:32647/d/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&from=${from}&to=${to}&timezone=utc&var-datasource=default&var-cluster=&var-instance=$__all&refresh=60s`;
  };

  const renderContent = () => {
    switch(selectedTab) {
      case 'onpremise':
        return (
          <>
            <EnvironmentMetrics environment="onpremise" timeRange={timeRange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.onpremise.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  timeRange={timeRange}
                />
              ))}
            </div>
          </>
        );
      case 'cloud':
        return (
          <>
            <EnvironmentMetrics environment="cloud" timeRange={timeRange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.cloud.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  timeRange={timeRange}
                />
              ))}
            </div>
          </>
        );
      default:
        return (
          <>
            <div className="h-[600px] mb-6">
              <iframe
                src={getMainDashboardUrl()}
                className="w-full h-full border-0 rounded-lg"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
                referrerPolicy="no-referrer"
                title="System Overview"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[...services.onpremise, ...services.cloud].map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  timeRange={timeRange}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">하이브리드 MSA 모니터링</h1>
          <p className="text-sm text-gray-500">온프레미스 및 퍼블릭 클라우드 서비스 통합 모니터링</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            className="text-sm border rounded-md px-3 py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="15m">최근 15분</option>
            <option value="30m">최근 30분</option>
            <option value="1h">최근 1시간</option>
            <option value="3h">최근 3시간</option>
            <option value="6h">최근 6시간</option>
            <option value="1d">최근 1일</option>
          </select>
          <div className="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span className="text-sm">5초마다 갱신</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlarmClock className="h-4 w-4" />
            <span>마지막 업데이트: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        {[
          { id: 'all', label: '전체 환경', icon: Monitor },
          { id: 'onpremise', label: '온프레미스', icon: Server },
          { id: 'cloud', label: '퍼블릭 클라우드', icon: Cloud }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative flex items-center space-x-2
              ${selectedTab === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default SystemMonitoring;