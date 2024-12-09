import React, { useState, useEffect } from 'react';
import { 
  Activity,
  Server, 
  Cloud,
  RefreshCw,
  AlarmClock,
  Search,
  Cpu,
  Memory,
  Network,
  Database,
  ArrowUp,
  ArrowDown,
  HardDrive,
  Settings,
  Coffee
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
    case '1w':
      from = to - 7 * 24 * 60 * 60 * 1000;
      break;
    case '2w':
      from = to - 14 * 24 * 60 * 60 * 1000;
      break;
    case '1m':
      from = to - 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      from = to - 7 * 24 * 60 * 60 * 1000;
  }
  
  return { from, to };
};

const calculateTrend = (current, previous) => {
  if (!previous) return 'stable';
  return current > previous * 1.05 ? 'up' : 
         current < previous * 0.95 ? 'down' : 'stable';
};

const calculateStatus = (value, metric) => {
  switch(metric) {
    case 'cpu':
      return value > 80 ? 'warning' : 'normal';
    case 'memory':
      return value > 85 ? 'warning' : 'normal';
    case 'disk':
      return value > 90 ? 'warning' : 'normal';
    case 'latency':
      return value > 5 ? 'warning' : 'normal';
    default:
      return 'normal';
  }
};

const useServiceMetrics = (serviceName, environment, timeRange) => {
  const [metrics, setMetrics] = useState({
    cpu: { value: '0%', trend: 'stable', status: 'normal' },
    memory: { value: '0%', trend: 'stable', status: 'normal' },
    disk: { value: '0%', trend: 'stable', status: 'normal' },
    latency: { value: '0회', trend: 'stable', status: 'normal' }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const prometheusEndpoint = 'http://192.168.0.142:30090';
        const { from, to } = calculateTimeRange(timeRange);
        const timeParam = `[${Math.floor((to - from) / 1000)}s]`;

        const responses = await Promise.all([
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_cpu_usage_seconds_total{namespace="${serviceName}"}${timeParam})) * 100`
            },
          }),
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(container_memory_working_set_bytes{container!="POD",container!="",namespace="${serviceName}"}) / sum(kube_pod_container_resource_limits{resource="memory",namespace="${serviceName}"}) * 100`
            },
          }),
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `max(kubelet_volume_stats_used_bytes{namespace="${serviceName}"} / kubelet_volume_stats_capacity_bytes{namespace="${serviceName}"}) * 100`
            },
          }),
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(increase(kube_pod_container_status_restarts_total{namespace="${serviceName}"}${timeParam}))`
            },
          })
        ]);

        const processMetricResponse = (response, metricType) => {
          console.log(`Processing ${metricType} metric:`, response?.data?.data?.result);
          
          const value = response?.data?.data?.result[0]?.value[1] || 0;
          const previousValue = response?.data?.data?.result[0]?.value[0] || 0;

          return {
            value: metricType === 'latency' ? 
              `${Math.round(value)}회` : 
              `${Math.round(value)}%`,
            trend: calculateTrend(value, previousValue),
            status: calculateStatus(value, metricType)
          };
        };

        const newMetrics = {
          cpu: processMetricResponse(responses[0], 'cpu'),
          memory: processMetricResponse(responses[1], 'memory'),
          disk: processMetricResponse(responses[2], 'disk'),
          latency: processMetricResponse(responses[3], 'latency')
        };

        console.log(`Setting new metrics for ${serviceName}:`, newMetrics);
        setMetrics(newMetrics);

      } catch (error) {
        console.error('Error fetching metrics:', {
          error,
          serviceName,
          environment,
          errorMessage: error.response?.data?.error || error.message
        });
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, [serviceName, environment, timeRange]);

  return metrics;
};

const useOverallMetrics = (timeRange) => {
  const [metrics, setMetrics] = useState({
    cpu: { value: '0%', trend: 'stable' },
    memory: { value: '0%', trend: 'stable' },
    pods: { value: '0', trend: 'stable' },
    latency: { value: '0ms', trend: 'stable' }
  });

  useEffect(() => {
    const fetchOverallMetrics = async () => {
      try {
        const { from, to } = calculateTimeRange(timeRange);
        const timeParam = `[${Math.floor((to - from) / 1000)}s]`;

        const responses = await Promise.all([
          axios.get('http://192.168.0.142:30090/api/v1/query', {
            params: {
              query: `100 - (avg(rate(node_cpu_seconds_total{mode="idle"}${timeParam})) by (instance) * 100)`
            }
          }),
          axios.get('http://192.168.0.142:30090/api/v1/query', {
            params: {
              query: `100 * (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes`
            }
          }),
          axios.get('http://192.168.0.142:30090/api/v1/query', {
            params: {
              query: `100 - ((node_filesystem_avail_bytes{mountpoint="/"} * 100) / node_filesystem_size_bytes{mountpoint="/"})`
            }
          }),
          axios.get('http://192.168.0.142:30090/api/v1/query', {
            params: {
              query: `rate(node_load1${timeParam})`
            }
          })
        ]);

        setMetrics({
          cpu: {
            value: `${Math.round(responses[0].data.data.result[0]?.value[1] || 0)}%`,
            trend: calculateTrend(responses[0].data.data.result[0]?.value[1], responses[0].data.data.result[0]?.value[0])
          },
          memory: {
            value: `${Math.round(responses[1].data.data.result[0]?.value[1] || 0)}%`,
            trend: calculateTrend(responses[1].data.data.result[0]?.value[1], responses[1].data.data.result[0]?.value[0])
          },
          pods: {
            value: `${(100 - (responses[2].data.data.result[0]?.value[1] || 0)).toFixed(2)}%`,
            trend: calculateTrend(responses[2].data.data.result[0]?.value[1], responses[2].data.data.result[0]?.value[0])
          },
          latency: {
            value: `${Math.round((responses[3].data.data.result[0]?.value[1] || 0) * 1000)}ms`,
            trend: calculateTrend(responses[3].data.data.result[0]?.value[1], responses[3].data.data.result[0]?.value[0])
          }
        });
      } catch (error) {
        console.error('Error fetching overall metrics:', error);
      }
    };

    fetchOverallMetrics();
    const interval = setInterval(fetchOverallMetrics, 5000);
    return () => clearInterval(interval);
  }, [timeRange]);

  return metrics;
};

const services = {
  onpremise: [
    {
      name: 'contractservice',
      displayName: '계약 서비스',
      type: 'Spring Boot',
      icon: Database,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'contractservice'
    },
    {
      name: 'walletservice',
      displayName: '지갑 서비스',
      type: 'Spring Boot',
      icon: HardDrive,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'walletservice'
    }
  ],
  cloud: [
    {
      name: 'userservice',
      displayName: '사용자 서비스',
      type: 'Spring Boot',
      icon: Cloud,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'userservice'
    },
    {
      name: 'startupservice',
      displayName: '스타트업 서비스',
      type: 'Spring Boot',
      icon: Activity,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'startupservice'
    },
    {
      name: 'coinservice',
      displayName: '코인 서비스',
      type: 'Spring Boot',
      icon: Settings,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'coinservice'
    },
    {
      name: 'frontend',
      displayName: '프론트엔드',
      type: 'React',
      icon: Search,
      dashboardId: '85a562078cdf77779eaa1add43ccec1e',
      namespace: 'frontend'
    }
  ]
};

const ServiceCard = ({ service, environment, timeRange }) => {
  const metrics = useServiceMetrics(service.name, environment, timeRange);

  const getGrafanaUrl = (service) => {
    const baseUrl = 'http://192.168.0.142:32647';
    const { from, to } = calculateTimeRange(timeRange);
    
    return `${baseUrl}/d-solo/${service.dashboardId}/kubernetes-compute-resources-namespace-pods?orgId=1&from=${from}&to=${to}&timezone=utc&var-datasource=prometheus&var-cluster=&var-namespace=${service.namespace}&refresh=10s&panelId=5`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <service.icon className="mr-2 h-5 w-5" />
            <div>
              {service.displayName}
              <span className="ml-2 text-sm text-gray-500">({service.type})</span>
            </div>
          </CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs ${
            Object.values(metrics).some(m => m.status === 'warning')
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {Object.values(metrics).some(m => m.status === 'warning') ? '주의 필요' : '정상'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">CPU</p>
              <p className="text-lg font-bold">{metrics.cpu.value}</p>
            </div>
            <div className={`text-sm ${
              metrics.cpu.trend === 'up' ? 'text-red-500' :
              metrics.cpu.trend === 'down' ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {metrics.cpu.trend === 'up' && <ArrowUp className="h-4 w-4" />}
              {metrics.cpu.trend === 'down' && <ArrowDown className="h-4 w-4" />}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">메모리</p>
              <p className="text-lg font-bold">{metrics.memory.value}</p>
            </div>
            <div className={`text-sm ${
              metrics.memory.trend === 'up' ? 'text-red-500' :
              metrics.memory.trend === 'down' ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {metrics.memory.trend === 'up' && <ArrowUp className="h-4 w-4" />}
              {metrics.memory.trend === 'down' && <ArrowDown className="h-4 w-4" />}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">디스크</p>
              <p className="text-lg font-bold">{metrics.disk.value}</p>
            </div>
            <div className={`text-sm ${
              metrics.disk.trend === 'up' ? 'text-red-500' :
              metrics.disk.trend === 'down' ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {metrics.disk.trend === 'up' && <ArrowUp className="h-4 w-4" />}
              {metrics.disk.trend === 'down' && <ArrowDown className="h-4 w-4" />}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">컨테이너 재시작 횟수</p>
              <p className="text-lg font-bold">{metrics.latency.value}</p>
            </div>
            <div className={`text-sm ${
              metrics.latency.trend === 'up' ? 'text-red-500' :
              metrics.latency.trend === 'down' ? 'text-green-500' :
              'text-gray-500'
            }`}>
              {metrics.latency.trend === 'up' && <ArrowUp className="h-4 w-4" />}
              {metrics.latency.trend === 'down' && <ArrowDown className="h-4 w-4" />}
            </div>
          </div>
        </div>
        <div className="h-[300px] mt-6">
          <iframe 
            src={getGrafanaUrl(service)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
            referrerPolicy="no-referrer"
            className="w-full h-full rounded-md"
            frameBorder="0"
            title={`${service.displayName} Metrics`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const OverallMetricsSection = ({ timeRange }) => {
  const metrics = useOverallMetrics(timeRange);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-600">전체 CPU 사용률</span>
          </div>
          <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            정상
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{metrics.cpu.value}</span>
          <div className={`text-sm ${metrics.cpu.trend === 'up' ? 'text-red-500' : metrics.cpu.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
            {metrics.cpu.trend === 'up' && <ArrowUp className="h-4 w-4" />}
            {metrics.cpu.trend === 'down' && <ArrowDown className="h-4 w-4" />}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Cloud className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-600">전체 메모리</span>
          </div>
          <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            정상
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{metrics.memory.value}</span>
          <div className={`text-sm ${metrics.memory.trend === 'up' ? 'text-red-500' : metrics.memory.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
            {metrics.memory.trend === 'up' && <ArrowUp className="h-4 w-4" />}
            {metrics.memory.trend === 'down' && <ArrowDown className="h-4 w-4" />}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-600">디스크 사용률</span>
          </div>
          <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            정상
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{metrics.pods.value}</span>
          <div className={`text-sm ${metrics.pods.trend === 'up' ? 'text-yellow-500' : metrics.pods.trend === 'down' ? 'text-blue-500' : 'text-gray-500'}`}>
            {metrics.pods.trend === 'up' && <ArrowUp className="h-4 w-4" />}
            {metrics.pods.trend === 'down' && <ArrowDown className="h-4 w-4" />}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-600">평균 응답시간</span>
          </div>
          <div className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            정상
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{metrics.latency.value}</span>
          <div className={`text-sm ${metrics.latency.trend === 'up' ? 'text-red-500' : metrics.latency.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`}>
            {metrics.latency.trend === 'up' && <ArrowUp className="h-4 w-4" />}
            {metrics.latency.trend === 'down' && <ArrowDown className="h-4 w-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceMonitoring = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [timeRange, setTimeRange] = useState('1w');

  const getOverallDashboardUrl = () => {
    const { from, to } = calculateTimeRange(timeRange);
    http://192.168.0.142:32647/d/7d57716318ee0dddbac5a7f451fb7753/node-exporter-nodes?orgId=1&from=now-1h&to=now&timezone=utc&var-datasource=default&var-cluster=&var-instance=10.0.3.160:9100&refresh=30s
    return `http://192.168.0.142:32647/d/7d57716318ee0dddbac5a7f451fb7753/node-exporter-nodes?orgId=1&from=${from}&to=${to}&timezone=utc&var-datasource=default&var-cluster=&var-instance=10.0.3.160:9100&refresh=10s`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">서비스 성능 모니터링</h1>
          <p className="text-sm text-gray-500">MSA 서비스별 성능 현황</p>
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
            <option value="1w">최근 1주일</option>
            <option value="2w">최근 2주일</option>
            <option value="1m">최근 1개월</option>
          </select>
          <div className="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span className="text-sm">5초마다 갱신</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlarmClock className="h-4 w-4" />
            <span>마지막 업데이트: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        {[
          { id: 'all', label: '전체 환경', icon: Activity },
          { id: 'onpremise', label: '온프레미스', icon: Server },
          { id: 'cloud', label: '클라우드', icon: Cloud }
        ].map((env) => (
          <button
            key={env.id}
            onClick={() => setSelectedEnvironment(env.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative flex items-center space-x-2
              ${selectedEnvironment === env.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <env.icon className="h-4 w-4" />
            <span>{env.label}</span>
          </button>
        ))}
      </div>

      {selectedEnvironment === 'all' && (
        <>
          <OverallMetricsSection timeRange={timeRange} />
          <div className="h-[600px]">
            <iframe
              src={getOverallDashboardUrl()}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
              referrerPolicy="no-referrer"
              title="Overall Performance"
            />
          </div>
        </>
      )}

      {selectedEnvironment !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services[selectedEnvironment].map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              environment={selectedEnvironment}
              timeRange={timeRange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitoring;