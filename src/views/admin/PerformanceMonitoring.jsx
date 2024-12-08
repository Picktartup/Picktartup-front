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


const useServiceMetrics = (serviceName, environment) => {
    const [metrics, setMetrics] = useState({
      cpu: { value: '0%', trend: 'stable', status: 'normal' },
      memory: { value: '0%', trend: 'stable', status: 'normal' },
      disk: { value: '0%', trend: 'stable', status: 'normal' },
      latency: { value: '0회', trend: 'stable', status: 'normal' }
    });
  
    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const prometheusEndpoint = 'https://picktartup.local:31158';
  
          const responses = await Promise.all([
            // CPU 사용률
            axios.get(`${prometheusEndpoint}/api/v1/query`, {
              params: {
                query: `sum(rate(container_cpu_usage_seconds_total{namespace="${serviceName}"}[5m])) * 100`
              }
            }),
            // 메모리 사용률
            axios.get(`${prometheusEndpoint}/api/v1/query`, {
              params: {
                query: `sum(container_memory_working_set_bytes{container!="POD",container!="",namespace="${serviceName}"}) / sum(kube_pod_container_resource_limits{resource="memory",namespace="${serviceName}"}) * 100`
              }
            }),
            // 디스크 사용률
            axios.get(`${prometheusEndpoint}/api/v1/query`, {
              params: {
                query: `max(kubelet_volume_stats_used_bytes{namespace="${serviceName}"} / kubelet_volume_stats_capacity_bytes{namespace="${serviceName}"}) * 100`
              }
            }),
            // 재시작 횟수로 변경
            axios.get(`${prometheusEndpoint}/api/v1/query`, {
                params: {
                  query: `sum(kube_pod_container_status_restarts_total{namespace="${serviceName}"})`
                }
              })
          ]);
  
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
  
          const processMetricResponse = (response, metricType) => {
            // 실제 데이터가 있는지 확인하고 로깅
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
  
          // 새로운 메트릭 값을 설정
          const newMetrics = {
            cpu: processMetricResponse(responses[0], 'cpu'),
            memory: processMetricResponse(responses[1], 'memory'),
            disk: processMetricResponse(responses[2], 'disk'),
            latency: processMetricResponse(responses[3], 'latency')
          };
  
          // 상태 업데이트 전에 로깅
          console.log(`Setting new metrics for ${serviceName}:`, newMetrics);
  
          // 상태 업데이트
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
  
      // 초기 데이터 가져오기
      fetchMetrics();
  
      // 5초마다 데이터 업데이트
      const interval = setInterval(fetchMetrics, 5000);
  
      // 컴포넌트 언마운트 시 인터벌 정리
      return () => clearInterval(interval);
    }, [serviceName, environment]);
  
    return metrics;
  };

const useOverallMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: { value: '0%', trend: 'stable' },
    memory: { value: '0%', trend: 'stable' },
    pods: { value: '0', trend: 'stable' },
    latency: { value: '0ms', trend: 'stable' }
  });

  useEffect(() => {
    const fetchOverallMetrics = async () => {
      try {
        const responses = await Promise.all([
          // CPU 사용률 (예시)
          axios.get('https://picktartup.local:31158/api/v1/query', {
            params: {
              query: `100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) by (instance) * 100)`
            }
          }),
          // 메모리 사용률
          axios.get('https://picktartup.local:31158/api/v1/query', {
            params: {
              query: `100 * (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes`
            }
          }),
          // 디스크 사용률
          axios.get('https://picktartup.local:31158/api/v1/query', {
            params: {
              query: `100 - ((node_filesystem_avail_bytes{mountpoint="/"} * 100) / node_filesystem_size_bytes{mountpoint="/"})`
            }
          }),
          // 시스템 로드
          axios.get('https://picktartup.local:31158/api/v1/query', {
            params: {
              query: `node_load1`  
            }
          })
        ]);

        const calculateTrend = (current, previous) => {
          if (!previous) return 'stable';
          return current > previous * 1.05 ? 'up' : 
                 current < previous * 0.95 ? 'down' : 'stable';
        };

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
  }, []);

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

const ServiceCard = ({ service, environment }) => {
    const metrics = useServiceMetrics(service.name, environment);
  
    const getGrafanaUrl = (service) => {
        const baseUrl = 'https://picktartup.local:31158';
        const now = Date.now();
        const from = now - 60 * 60 * 1000; // 1시간 전
      
        return `${baseUrl}/d-solo/${service.dashboardId}/kubernetes-compute-resources-namespace-pods?orgId=1&from=${from}&to=${now}&timezone=utc&var-datasource=prometheus&var-cluster=&var-namespace=${service.namespace}&refresh=10s&panelId=5&__feature.dashboardSceneSolo`;
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
        <div className="h-[300px] mt-6"> {/* mt-4에서 mt-6으로 변경하여 상단 여백 증가 */}
            <iframe 
            src={getGrafanaUrl(service)}
            className="w-full h-full rounded-md" // rounded-lg 제거
            frameBorder="0"
            title={`${service.displayName} Metrics`}
            />
        </div>
      </CardContent>
    </Card>
  );
};

const OverallMetricsSection = () => {
  const metrics = useOverallMetrics();

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
            <span className="font-medium text-gray-600"> 디스크 사용률 </span>
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
  const [timeRange, setTimeRange] = useState('30m');

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

      {/* 환경 선택 */}
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

      {/* 전체 환경일 때 보여줄 전체 메트릭스 */}
      {selectedEnvironment === 'all' && (
        <>
          <OverallMetricsSection />
          <div className="h-[600px]">
            <iframe
              src="https://picktartup.local:31158/0/d/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&from=2024-12-06T09:16:21.506Z&to=2024-12-06T10:16:21.507Z&timezone=utc&var-datasource=default&var-cluster=&refresh=10s&kiosk"
              className="w-full h-full border-0"
              title="Overall Performance"
            />
          </div>
        </>
      )}

      {/* 서비스별 성능 현황 */}
      {selectedEnvironment !== 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services[selectedEnvironment].map((service, index) => (
            <ServiceCard 
                key={index} 
                service={service} 
                environment={selectedEnvironment}  // environment prop 추가
            />
            ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitoring;