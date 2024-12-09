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
  Coffee,
  Globe,
  Router
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '../../components/card/DashboardCard';
import axios from 'axios';

const useNetworkMetrics = (serviceName, environment) => {
  const [metrics, setMetrics] = useState({
    traffic: { value: '0MB/s', trend: 'stable', status: 'normal' },
    latency: { value: '0ms', trend: 'stable', status: 'normal' },
    errors: { value: '0', trend: 'stable', status: 'normal' },
    packets: { value: '0/s', trend: 'stable', status: 'normal' }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const prometheusEndpoint = 'http://192.168.0.142:30090';

        const responses = await Promise.all([
          // 네트워크 트래픽 (수신 + 송신)
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_receive_bytes_total{namespace="${serviceName}"}[5m]) + rate(container_network_transmit_bytes_total{namespace="${serviceName}"}[5m]))`
            }
          }),
          // 네트워크 지연시간
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `histogram_quantile(0.95, sum(rate(container_network_tcp_usage_seconds_total{namespace="${serviceName}"}[5m])) by (le)) * 1000`
            }
          }),
          // 네트워크 에러
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_receive_errors_total{namespace="${serviceName}"}[5m]) + rate(container_network_transmit_errors_total{namespace="${serviceName}"}[5m]))`
            }
          }),
          // 패킷 처리량
          axios.get(`${prometheusEndpoint}/api/v1/query`, {
            params: {
              query: `sum(rate(container_network_receive_packets_total{namespace="${serviceName}"}[5m]) + rate(container_network_transmit_packets_total{namespace="${serviceName}"}[5m]))`
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
            case 'traffic':
              return value > 100 ? 'warning' : 'normal'; // 100MB/s 이상일 때 경고
            case 'latency':
              return value > 1000 ? 'warning' : 'normal'; // 1초 이상일 때 경고
            case 'errors':
              return value > 10 ? 'warning' : 'normal'; // 10개/s 이상의 에러 발생 시 경고
            case 'packets':
              return value > 10000 ? 'warning' : 'normal'; // 10000패킷/s 이상일 때 경고
            default:
              return 'normal';
          }
        };

        const processMetricResponse = (response, metricType) => {
          const value = response?.data?.data?.result[0]?.value[1] || 0;
          const previousValue = response?.data?.data?.result[0]?.value[0] || 0;

          const formatValue = (val, type) => {
            switch(type) {
              case 'traffic':
                return `${(val / 1024 / 1024).toFixed(2)}MB/s`;
              case 'latency':
                return `${Math.round(val)}ms`;
              case 'errors':
                return Math.round(val).toString();
              case 'packets':
                return `${Math.round(val)}/s`;
              default:
                return val.toString();
            }
          };

          return {
            value: formatValue(value, metricType),
            trend: calculateTrend(value, previousValue),
            status: calculateStatus(value, metricType)
          };
        };

        setMetrics({
          traffic: processMetricResponse(responses[0], 'traffic'),
          latency: processMetricResponse(responses[1], 'latency'),
          errors: processMetricResponse(responses[2], 'errors'),
          packets: processMetricResponse(responses[3], 'packets')
        });
      } catch (error) {
        console.error('Error fetching network metrics:', {
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
  }, [serviceName, environment]);

  return metrics;
};

const useOverallNetworkMetrics = () => {
  // Overall network metrics implementation...
  // (Similar to previous useOverallMetrics but with network-specific metrics)
  // ...
};

const services = {
  vpn: [
    {
      name: 'vpnservice',
      displayName: 'VPN 서비스',
      type: 'OpenVPN',
      icon: Network,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'vpnservice'
    }
  ],
  onpremise: [
    {
      name: 'contractservice',
      displayName: '계약 서비스',
      type: 'Spring Boot',
      icon: Database,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'contractservice'
    },
    {
      name: 'walletservice',
      displayName: '지갑 서비스',
      type: 'Spring Boot',
      icon: HardDrive,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'walletservice'
    }
  ],
  cloud: [
    {
      name: 'userservice',
      displayName: '사용자 서비스',
      type: 'Spring Boot',
      icon: Cloud,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'userservice'
    },
    {
      name: 'startupservice',
      displayName: '스타트업 서비스',
      type: 'Spring Boot',
      icon: Activity,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'startupservice'
    },
    {
      name: 'coinservice',
      displayName: '코인 서비스',
      type: 'Spring Boot',
      icon: Settings,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'coinservice'
    },
    {
      name: 'frontend',
      displayName: '프론트엔드',
      type: 'React',
      icon: Search,
      dashboardId: '8b7a8b326d7a6f1f04244066368c67af',
      namespace: 'frontend'
    }
  ]
};

const ServiceCard = ({ service, environment }) => {
  const metrics = useNetworkMetrics(service.name, environment);

  const getGrafanaUrl = (service) => {
    const baseUrl = window.location.protocol + '//192.168.0.142:32647';
    const now = Date.now();
    const from = now - 60 * 60 * 1000;
  
    return `${baseUrl}/d-solo/${service.dashboardId}/kubernetes-networking-namespace-pods?orgId=1&from=${from}&to=${now}&timezone=utc&var-datasource=default&var-cluster=&var-namespace=${service.namespace}&refresh=10s&panelId=1&__feature.dashboardSceneSolo`;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="bg-transparent">
            <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <service.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                <h3 className="font-bold text-gray-900">{service.displayName}</h3>
                <p className="text-sm text-gray-500">{service.type}</p>
                </div>
            </CardTitle>
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                Object.values(metrics).some(m => m.status === 'warning')
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
                {Object.values(metrics).some(m => m.status === 'warning') ? '주의 필요' : '정상'}
            </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
            {/* 메트릭 카드들 디자인 변경 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-medium text-gray-600">네트워크 트래픽</p>
                <div className={`text-sm ${getStatusColor(metrics.traffic.trend)}`}>
                    {getTrendIcon(metrics.traffic.trend)}
                </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metrics.traffic.value}</p>
            </div>
            {/* 나머지 메트릭 카드들도 같은 스타일 적용 */}
            </div>
            <div className="h-[300px] mt-6 rounded-xl overflow-hidden shadow-inner">
            
            <iframe 
                src={getGrafanaUrl(service)}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
                referrerPolicy="no-referrer"
                frameBorder="0"
                title={`${service.displayName} Network Metrics`}
            />
            </div>
        </CardContent>
        </Card>
  );
};

const NetworkMonitoring = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [timeRange, setTimeRange] = useState('30m');

  const getOverallGrafanaUrl = () => {
  const baseUrl = window.location.protocol + '//192.168.0.142:32647';
  const now = Date.now();
  const from = now - 60 * 60 * 1000;

  return `${baseUrl}/d/ff635a025bcfea7bc3dd4f508990a3e9/kubernetes-networking-cluster?orgId=1&from=${from}&to=${now}&timezone=utc&var-datasource=default&var-cluster=&refresh=10s&kiosk`;
};

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">네트워크 모니터링</h1>
          <p className="text-sm text-gray-500">서비스별 네트워크 현황</p>
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

     {/* Environment selection tabs */}
     <div className="flex space-x-2 border-b">
    {[
        { id: 'all', label: '전체 환경', icon: Activity },
        { id: 'onpremise', label: '온프레미스', icon: Server },
        { id: 'cloud', label: '클라우드', icon: Cloud },
        { id: 'vpn', label: 'VPN', icon: Network }  // VPN을 마지막으로 이동
    ].map((env) => (
        <button
        key={env.id}
        onClick={() => setSelectedEnvironment(env.id)}
        className={`px-4 py-2 text-sm font-medium transition-colors relative flex items-center space-x-2
            ${selectedEnvironment === env.id 
            ? 'text-blue-600 border-b-2 border-blue-600'  // 색상을 blue 계열로 변경
            : 'text-gray-600 hover:text-gray-800'
            }`}
        >
        <env.icon className="h-4 w-4" />
        <span>{env.label}</span>
        </button>
    ))}
    </div>


     {/* Overall metrics for 'all' environment */}
     {selectedEnvironment === 'all' && (
       <>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {/* Overall metrics cards */}
           {/* ... (Similar to previous OverallMetricsSection but with network metrics) */}
         </div>
         <div className="h-[600px] mt-6">
           <iframe
             src={getOverallGrafanaUrl()}
             sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
              referrerPolicy="no-referrer"
             className="w-full h-full border-0"
             title="Overall Network Performance"
           />
         </div>
       </>
     )}

     {/* Service-specific metrics */}
     {selectedEnvironment !== 'all' && (
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {services[selectedEnvironment]?.map((service, index) => (
           <ServiceCard 
             key={index}
             service={service}
             environment={selectedEnvironment}
           />
         ))}
       </div>
     )}
   </div>
 );
};

const getStatusColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-rose-500';
      case 'down':
        return 'text-emerald-500';
      default:
        return 'text-slate-500';
    }
  };
  
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4" />;
      case 'down':
        return <ArrowDown className="h-4 w-4" />;
      default:
        return null;
    }
  };

export default NetworkMonitoring;