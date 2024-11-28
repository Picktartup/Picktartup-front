import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MonthlyMetrics = ({ data }) => {
  // 데이터 전처리
  const processedData = data.map((item) => {
    const date = new Date(item.metricDate);
    return {
      month: `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`,
      MAU: item.mau,
      고용인원: item.employeeCount,
      createdAt: item.createdAt,
      dataSource: item.dataSource,
    };
  });

  // 전월 대비 증감률 계산 함수
  const calculateGrowthRate = (currentValue, previousValue) => {
    if (!previousValue) return null; // 이전 값이 없으면 null 반환
    const growthRate = ((currentValue - previousValue) / previousValue) * 100;
    return growthRate;
  };

  // 전월 대비 증감률 추가
  const processedDataWithGrowth = processedData.map((item, index) => {
    const previousData = processedData[index - 1];
    return {
      ...item,
      mauGrowthRate: calculateGrowthRate(item.MAU, previousData?.MAU),
      employeeGrowthRate: calculateGrowthRate(item.고용인원, previousData?.고용인원),
    };
  });

  // MAU 숫자 포맷팅 함수
  const formatMAU = (value) => {
    if (!value) return '0';
    return `${(value / 1000).toFixed(1)}천`;
  };

  // 최신 업데이트 날짜 가져오기
  const latestUpdate = data[0]?.createdAt
    ? new Date(data[0].createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  // 데이터 출처
  const dataSource = data[0]?.dataSource || 'ADMIN_INPUT';

  // 증감률 표시 컴포넌트
  const GrowthIndicator = ({ value }) => {
    if (value === null) return '-';
    const color = value >= 0 ? 'text-red-500' : 'text-blue-500';
    const arrow = value >= 0 ? '▲' : '▼';
    return (
      <span className={color}>
        {arrow} {Math.abs(value).toFixed(1)}%
      </span>
    );
  };

  // 테이블 렌더링 함수
  const renderTable = (data, title, valueKey, growthKey) => (
    <div className="mt-6 overflow-x-auto">
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-4 py-2">구분</th>
            {data.slice(-6).map((item) => (
              <th key={item.month} className="border px-4 py-2">
                {item.month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-medium">{title}</td>
            {data.slice(-6).map((item) => (
              <td key={item.month} className="border px-4 py-2 text-center">
                {valueKey === 'MAU' ? formatMAU(item[valueKey]) : item[valueKey]}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border px-4 py-2 font-medium">전월대비 성장률</td>
            {data.slice(-6).map((item) => (
              <td key={item.month} className="border px-4 py-2 text-center">
                <GrowthIndicator value={item[growthKey]} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full space-y-8">
      {/* MAU 차트 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">월간 활성 사용자(MAU)</h2>
          <span className="text-sm text-gray-500">업데이트: {latestUpdate}</span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedDataWithGrowth}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={formatMAU} />
              <Tooltip
                formatter={(value) => [`${formatMAU(value)}명`, 'MAU']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="MAU"
                stroke="#2dd4bf"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {renderTable(processedDataWithGrowth, 'MAU', 'MAU', 'mauGrowthRate')}
        <div className="mt-4 text-xs text-gray-500">* 출처: {dataSource}</div>
      </div>

      {/* 고용인원 차트 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">고용인원 추이</h2>
          <span className="text-sm text-gray-500">업데이트: {latestUpdate}</span>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={processedDataWithGrowth}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${value}명`, '고용인원']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '8px',
                  padding: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="고용인원"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {renderTable(processedDataWithGrowth, '고용인원', '고용인원', 'employeeGrowthRate')}
        <div className="mt-4 text-xs text-gray-500">* 출처: {dataSource}</div>
      </div>
    </div>
  );
};

export default MonthlyMetrics;
