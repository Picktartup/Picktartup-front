import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnnualFinancialMetrics = ({ data }) => {
  // 데이터에 음수가 있는지 확인
  const hasNegativeValues = data.some(item => 
    item.annual_revenue < 0 || item.operating_profit < 0 || item.net_profit < 0
  );

  // 데이터 전처리
  const processedData = data.map(item => ({
    year: item.year,
    매출액: Math.round(item.annual_revenue / 10000000),
    영업이익: Math.round(item.operating_profit / 10000000),
    순이익: Math.round(item.net_profit / 10000000)
  }));

  // Y축 범위 및 눈금 계산
  const getYAxisProps = () => {
    const allValues = processedData.flatMap(d => [d.매출액, d.영업이익, d.순이익]);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);

    if (hasNegativeValues) {
      // 음수가 있는 경우
      const absMax = Math.max(Math.abs(minValue), Math.abs(maxValue));
      const interval = Math.ceil(absMax / 5);
      const maxDomain = Math.ceil(absMax / interval) * interval;
      const minDomain = -maxDomain;

      return {
        domain: [minDomain, maxDomain],
        ticks: Array.from(
          { length: 11 },
          (_, i) => minDomain + (i * (maxDomain - minDomain) / 10)
        )
      };
    } else {
      // 음수가 없는 경우
      const interval = Math.ceil(maxValue / 5);
      const maxDomain = Math.ceil(maxValue / interval) * interval;
      
      return {
        domain: [0, maxDomain],
        ticks: Array.from(
          { length: 6 },
          (_, i) => i * (maxDomain / 5)
        )
      };
    }
  };

  const yAxisProps = getYAxisProps();

  // 값 포맷팅
  const formatValue = (value) => {
    if (value === 0 || value === undefined) return '-';
    return `${value}억원`;
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">연간 재무 현황</h2>
        <span className="text-sm text-gray-500">
          업데이트: {new Date().toLocaleDateString('ko-KR')}
        </span>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={yAxisProps.domain}
              ticks={yAxisProps.ticks}
              tickFormatter={(value) => `${value}억`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value}억원`, name]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '8px',
                padding: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="매출액" 
              fill="#2dd4bf"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="영업이익" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="순이익" 
              fill="#eab308"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 표 형식의 데이터 */}
      <div className="mt-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border px-4 py-2 text-left">구분</th>
              {processedData.map(item => (
                <th key={item.year} className="border px-4 py-2 text-center">
                  {item.year}년{item.year > 2021 ? '' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">매출액</td>
              {processedData.map(item => (
                <td key={item.year} className="border px-4 py-2 text-center">
                  {formatValue(item.매출액)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">영업이익</td>
              {processedData.map(item => (
                <td key={item.year} className="border px-4 py-2 text-center">
                  {formatValue(item.영업이익)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border px-4 py-2">순이익</td>
              {processedData.map(item => (
                <td key={item.year} className="border px-4 py-2 text-center">
                  {formatValue(item.순이익)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        * 출처: {data[0]?.data_source || 'ANNUAL_REPORT'}
      </div>
    </div>
  );
};

export default AnnualFinancialMetrics;