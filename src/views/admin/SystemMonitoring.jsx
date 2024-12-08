import React, { useState } from 'react';
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
  Coffee
} from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '../../components/card/DashboardCard';

const SystemMonitoring = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const environments = {
    onpremise: {
      name: '온프레미스',
      services: [
        {
          name: '결제 서비스',
          type: 'Spring Boot',
          status: 'normal',
          uptime: '99.99%',
          icon: Coffee,
          metrics: {
            cpu: '45%',
            memory: '12GB/16GB',
            pods: '3/3',
            requests: '250/s'
          }
        },
        {
          name: '회원 서비스',
          type: 'Spring Boot',
          status: 'warning',
          uptime: '99.95%',
          icon: Database,
          metrics: {
            cpu: '78%',
            memory: '14GB/16GB',
            pods: '4/4',
            requests: '180/s'
          }
        }
      ]
    },
    cloud: {
      name: '클라우드 (EKS)',
      services: [
        {
          name: '알림 서비스',
          type: 'Node.js',
          status: 'normal',
          uptime: '99.98%',
          icon: Cloud,
          metrics: {
            cpu: '25%',
            memory: '2.5GB/4GB',
            pods: '3/3',
            requests: '120/s'
          }
        },
        {
          name: '검색 서비스',
          type: 'Python',
          status: 'normal',
          uptime: '99.97%',
          icon: Grid,
          metrics: {
            cpu: '35%',
            memory: '3GB/4GB',
            pods: '2/2',
            requests: '90/s'
          }
        }
      ]
    }
  };

  const ServiceCard = ({ service }) => (
    <Card className="bg-white relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${
        service.status === 'normal' ? 'bg-green-500' : 'bg-yellow-500'
      }`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <service.icon className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.type}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            service.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {service.status === 'normal' ? '정상' : '주의'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CPU</span>
              <span className="text-sm font-medium">{service.metrics.cpu}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Memory</span>
              <span className="text-sm font-medium">{service.metrics.memory}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pods</span>
              <span className="text-sm font-medium">{service.metrics.pods}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Requests</span>
              <span className="text-sm font-medium">{service.metrics.requests}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">가용성</span>
          </div>
          <span className="text-lg font-bold">{service.uptime}</span>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch(selectedTab) {
      case 'onpremise':
        return (
          <>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  온프레미스 인프라 현황
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">물리 노드</span>
                    <p className="text-2xl font-bold mt-1">5</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">실행 중인 Pod</span>
                    <p className="text-2xl font-bold mt-1">24</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">스토리지</span>
                    <p className="text-2xl font-bold mt-1">2.1/5TB</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">네트워크</span>
                    <p className="text-sm mt-1">IN: 1.2GB/s</p>
                    <p className="text-sm">OUT: 800MB/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {environments.onpremise.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </>
        );
      case 'cloud':
        return (
          <>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Cloud className="mr-2 h-5 w-5" />
                  EKS 클러스터 현황
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">워커 노드</span>
                    <p className="text-2xl font-bold mt-1">3</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">실행 중인 Pod</span>
                    <p className="text-2xl font-bold mt-1">12</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">EBS 볼륨</span>
                    <p className="text-2xl font-bold mt-1">800GB/2TB</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">네트워크</span>
                    <p className="text-sm mt-1">IN: 600MB/s</p>
                    <p className="text-sm">OUT: 400MB/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {environments.cloud.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...environments.onpremise.services, ...environments.cloud.services].map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">하이브리드 MSA 모니터링</h1>
          <p className="text-sm text-gray-500">온프레미스 및 클라우드 서비스 통합 모니터링</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow text-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            30초마다 갱신
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlarmClock className="h-4 w-4" />
            <span>마지막 업데이트: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        {[
          { id: 'all', label: '전체 환경' },
          { id: 'onpremise', label: '온프레미스' },
          { id: 'cloud', label: '클라우드 (EKS)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative
              ${selectedTab === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
      
      {/* 시스템 알림 및 이벤트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                <CardTitle>시스템 알림</CardTitle>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                3개의 새로운 알림
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { severity: 'high', message: '결제 서비스 CPU 사용률 임계치 초과', time: '10분 전', env: 'onpremise' },
                { severity: 'medium', message: '검색 서비스 Auto-scaling 발생', time: '15분 전', env: 'cloud' },
                { severity: 'low', message: '회원 서비스 메모리 사용량 증가', time: '1시간 전', env: 'onpremise' }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-center justify-between ${
                  alert.severity === 'high' ? 'bg-red-50' :
                  alert.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        <span>{alert.time}</span>
                        <span>•</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                          {alert.env === 'onpremise' ? '온프레미스' : '클라우드'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    조치하기
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5" />
                <CardTitle>시스템 작업
                </CardTitle>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                모든 작업 보기
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  event: 'Auto-scaling 발생',
                  service: '검색 서비스',
                  environment: 'cloud',
                  detail: 'Pod 수 2→3 증가',
                  time: '10분 전'
                },
                {
                  event: '정기 백업 완료',
                  service: '회원 서비스',
                  environment: 'onpremise',
                  detail: '증분 백업 성공',
                  time: '30분 전'
                },
                {
                  event: '배포 완료',
                  service: '알림 서비스',
                  environment: 'cloud',
                  detail: 'v1.2.3 배포 완료',
                  time: '1시간 전'
                },
                {
                  event: 'DB 인덱스 재구축',
                  service: '결제 서비스',
                  environment: 'onpremise',
                  detail: '인덱스 최적화 완료',
                  time: '2시간 전'
                }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {event.environment === 'cloud' ? 
                        <Cloud className="h-5 w-5 text-blue-500" /> : 
                        <Server className="h-5 w-5 text-purple-500" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{event.event}</p>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        <span>{event.service}</span>
                        <span>•</span>
                        <span>{event.detail}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 서비스 의존성 맵 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Network className="mr-2 h-5 w-5" />
              <CardTitle>서비스 의존성 맵</CardTitle>
            </div>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>실시간</option>
              <option>최근 1시간</option>
              <option>최근 6시간</option>
              <option>최근 24시간</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
            서비스 의존성 맵 영역
          </div>
        </CardContent>
      </Card>

      {/* 리소스 사용량 트렌드 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Monitor className="mr-2 h-5 w-5" />
              <CardTitle>리소스 사용량 트렌드</CardTitle>
            </div>
            <div className="flex space-x-2">
              <select className="text-sm border rounded-md px-2 py-1">
                <option>모든 서비스</option>
                <option>결제 서비스</option>
                <option>회원 서비스</option>
                <option>알림 서비스</option>
                <option>검색 서비스</option>
              </select>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>최근 1시간</option>
                <option>최근 6시간</option>
                <option>최근 24시간</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">평균 CPU 사용률</h4>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">45%</span>
                <span className="text-green-500 text-sm">↓ 5%</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">평균 메모리 사용률</h4>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">68%</span>
                <span className="text-yellow-500 text-sm">↑ 12%</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">디스크 I/O</h4>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold">2.1K/s</span>
                <span className="text-blue-500 text-sm">↔ 안정</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 h-64">
            리소스 사용량 그래프 영역
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;