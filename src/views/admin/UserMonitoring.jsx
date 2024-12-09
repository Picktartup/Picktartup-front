import React, { useState } from 'react';
import { 
  Activity,
  AlertTriangle,
  Clock,
  RefreshCw,
  AlarmClock,
  BarChart3,
  PieChart,
  ListFilter,
  AlertCircle,
  Timer,
  Network,
  BarChart,
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '../../components/card/DashboardCard';

const DashboardCard = ({ icon: Icon, title, subtitle, color, children }) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100">
    <CardHeader className="bg-gradient-to-br from-white to-gray-50 border-b border-gray-100">
      <CardTitle>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${color}-50 shadow-sm`}>
            <Icon className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      {children}
    </CardContent>
  </Card>
);

const UserMonitoring = () => {
  const [timeRange, setTimeRange] = useState('2w');
  const [activeTab, setActiveTab] = useState('api');
  
  const dashboardUrls = {
    'slow-apis': 'af6c3502-60b3-49c0-8bae-bc8ad7881421',
    'traffic-timeline': 'b4429ba5-dac9-4183-aa5f-c2c91782a6a8',
    'traffic-timeline2': '1666cdb0-1911-4f3c-a652-8808059bd634',
    'traffic-trend': '7e8f310e-0655-463a-a318-6f109780b710',
    'error-count': '2afeb86c-b2e3-40a7-a027-abe19074c535',
    'api-response-time': '1666cdb0-1911-4f3c-a652-8808059bd634',
    'error-distribution': '228fa7f7-86bd-44e5-83dc-827f8fb3e349',
    'error-timeline': '4d4a1679-fac9-40bb-9ac6-7b2cd5bb66bf'
  };

  const getKibanaUrl = (dashboardId) => {
    const baseUrl = window.location.protocol + '//192.168.0.143:30117';
    // const now = Date.now();
    // const from = now - getTimeInMilliseconds(timeRange);
    const now = 'now';
    const from = `now-${timeRange}`;

  return `${baseUrl}/kibana/app/dashboards#/view/${dashboardUrls[dashboardId]}?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:'${from}',to:'${now}'))`;

  };

  const getTimeInMilliseconds = (range) => {
    const numbers = {
      '15m': 15 * 60 * 1000,
      '30m': 30 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '3h': 3 * 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000
    };
    return numbers[range] || 30 * 60 * 1000;
  };

  const tabs = [
    { id: 'api', label: 'API 모니터링', icon: Activity, color: 'blue' },
    { id: 'error', label: '에러 모니터링', icon: AlertTriangle, color: 'red' }
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">서비스 모니터링</h1>
          <p className="text-sm text-gray-500">실시간 API 및 에러 분석</p>
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

        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex space-x-1 px-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 text-sm font-medium transition-all duration-200 
                  flex items-center space-x-2 relative
                  ${activeTab === tab.id 
                    ? `text-${tab.color}-600` 
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-${tab.color}-600 transition-transform duration-300`} />
                )}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {activeTab === 'api' && (
              <div className="grid grid-cols-2 gap-8">
                <DashboardCard
                  icon={Timer}
                  title="응답시간 Top 5"
                  subtitle="가장 느린 API 목록"
                  color="amber"
                >
                    
                  <div className="h-[300px]">
                    <iframe
                      src={getKibanaUrl('slow-apis')}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      referrerPolicy="no-referrer"
                      frameBorder="0"
                      title="Slowest APIs"
                    />
                  </div>
                </DashboardCard>

                <DashboardCard
                  icon={BarChart3}
                  title="시간대별 트래픽"
                  subtitle="API 호출량 추이"
                  color="blue"
                >
                  <div className="h-[300px]">
                    <iframe
                      src={getKibanaUrl('traffic-timeline2')}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      referrerPolicy="no-referrer"
                      frameBorder="0"
                      title="Traffic Timeline"
                    />
                  </div>
                </DashboardCard>

                <DashboardCard
                  icon={Activity}
                  title="시간대별 트래픽 양"
                  subtitle="시간대별 가장 많은 트래픽 추이"
                  color="green"
                >
                  <div className="h-[300px]">
                    <iframe
                      src={getKibanaUrl('traffic-trend')}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      referrerPolicy="no-referrer"
                      frameBorder="0"
                      title="Most Called APIs"
                    />
                  </div>
                </DashboardCard>

                <DashboardCard
                  icon={Network}
                  title="서비스별 API 호출 분포"
                  subtitle="마이크로서비스 사용량"
                  color="indigo"
                >
                  <div className="h-[300px]">
                    <iframe
                      src={getKibanaUrl('traffic-timeline')}
                      className="w-full h-full"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      referrerPolicy="no-referrer"
                      frameBorder="0"
                      title="Service Distribution"
                    />
                  </div>
                </DashboardCard>
              </div>
            )}

            {activeTab === 'error' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <DashboardCard
                    icon={AlertCircle}
                    title="Error 발생 횟수"
                    subtitle="시간대별 에러 발생 추이"
                    color="red"
                  >
                    <div className="h-[300px]">
                      <iframe
                        src={getKibanaUrl('error-count')}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="no-referrer"
                        frameBorder="0"
                        title="Error Count"
                      />
                    </div>
                  </DashboardCard>

                  <DashboardCard
                    icon={AlertTriangle}
                    title="5XX 에러 현황"
                    subtitle="서버 에러 발생 현황"
                    color="rose"
                  >
                    <div className="h-[300px]">
                      <iframe
                        src={getKibanaUrl('error-timeline')}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="no-referrer"
                        frameBorder="0"
                        title="5XX Errors"
                      />
                    </div>
                  </DashboardCard>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <DashboardCard
                    icon={ListFilter}
                    title="시간대별 에러 메시지"
                    subtitle="상세 에러 로그"
                    color="gray"
                    className="col-span-3"
                  >
                    <div className="h-[400px]">
                      <iframe
                        src={getKibanaUrl('error-timeline')}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="no-referrer"
                        frameBorder="0"
                        title="Error Timeline"
                      />
                    </div>
                  </DashboardCard>

                  <DashboardCard
                    icon={PieChart}
                    title="Error 유형 분포"
                    subtitle="에러 타입별 비율"
                    color="orange"
                  >
                    <div className="h-[400px]">
                      <iframe
                        src={getKibanaUrl('error-distribution')}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        referrerPolicy="no-referrer"
                        frameBorder="0"
                        title="Error Distribution"
                      />
                    </div>
                  </DashboardCard>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

  );
};

export default UserMonitoring;