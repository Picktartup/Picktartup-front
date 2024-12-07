// src/components/card/DashboardCard.jsx
import React from 'react';
import { Server } from 'lucide-react';  

// 기본 카드 컴포넌트
export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${className}`}>
    {children}
  </div>
);

// 카드 헤더 컴포넌트
export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

// 카드 제목 컴포넌트
export const CardTitle = ({ children, className = '', icon: Icon }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
    <h3 className="text-lg font-semibold text-gray-800">{children}</h3>
  </div>
);

// 카드 콘텐츠 컴포넌트
export const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

// 상태 표시 뱃지 컴포넌트
export const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'normal':
          return 'bg-green-100 text-green-800';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800';
        case 'error':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status === 'normal' ? '정상' : '장애'}
        </span>
      );
    };
    

// 메트릭 표시 컴포넌트
export const MetricItem = ({ label, value, className = '' }) => (
  <div className={`flex items-center justify-between py-2 ${className}`}>
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value}</span>
  </div>
);

// Server 아이콘을 직접 사용하도록 수정
export const ServerStatusCard = ({ provider, data }) => (
    <Card>
      <CardHeader>
        <CardTitle icon={Server}>  {/* ServerIcon을 Server로 변경 */}
          {provider.toUpperCase()} 서버 상태
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <MetricItem 
            label="상태" 
            value={<StatusBadge status={data.status} />} 
          />
          <MetricItem 
            label="페이지 응답시간" 
            value={data.latency} 
          />
          <MetricItem 
            label="DNS 응답시간" 
            value={data.dns} 
          />
        </div>
      </CardContent>
    </Card>
  );