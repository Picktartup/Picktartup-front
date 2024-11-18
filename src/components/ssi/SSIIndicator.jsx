import React, { useState } from 'react';
import { TrendingUp, Users, Box, Lightbulb } from 'lucide-react';

const EvaluationDashboard = () => {
  const [selectedCriteria, setSelectedCriteria] = useState('default');

  const evaluationItems = [
    {
      category: 'People',
      icon: Users,
      status: '우수',
      score: 95,
      description: '창업자와 핵심 팀원이 해당 산업에서 5년 이상 활동했으며, 팀 내 협업이 매우 원활하고 역할 분담이 명확함',
      keyMetrics: [
        '팀 경력: 5년 이상',
        '협업 지수: 95%',
        '역할 분담: 완료'
      ]
    },
    {
      category: 'Product',
      icon: Box,
      status: '양호',
      score: 80,
      description: '베타 버전이 출시되었고 MAU가 20% 증가 중이며, 초기 사용자 피드백이 긍정적임',
      keyMetrics: [
        'MAU 증가율: 20%',
        '사용자 피드백: 긍정적',
        '개발 단계: 베타'
      ]
    },
    {
      category: 'Performance',
      icon: TrendingUp,
      status: '보통',
      score: 60,
      description: '초기 매출이 발생하고 있으며 거래량이 증가 추세에 있으나, 수익성 개선이 필요함',
      keyMetrics: [
        '월 거래량: 증가',
        '수익성: 개선 필요',
        '성장률: 5%'
      ]
    },
    {
      category: 'Potential',
      icon: Lightbulb,
      status: '진행 중',
      score: 40,
      description: '시장 성장률은 15% 예상되나 경쟁력 확보가 진행 중이며 장기 비전 수립이 필요함',
      keyMetrics: [
        '시장 성장률: 15%',
        '경쟁력: 확보 중',
        '비전: 수립 중'
      ]
    }
  ];

  const criteriaGuide = {
    우수: '해당 분야에서 탁월한 성과나 잠재력을 보유 (상위 20%)',
    양호: '업계 평균 이상의 성과나 잠재력 보유 (상위 40%)',
    보통: '업계 평균 수준의 성과나 잠재력 보유 (상위 60%)',
    진행중: '아직 평가하기 이르거나 개선이 필요한 상태'
  };

  const getStatusStyle = (status) => {
    const baseStyle = 'text-xs font-semibold px-3 py-1 rounded-full';
    switch (status) {
      case '우수':
        return `${baseStyle} bg-blue-100 text-blue-800`;
      case '양호':
        return `${baseStyle} bg-emerald-100 text-emerald-800`;
      case '보통':
        return `${baseStyle} bg-amber-100 text-amber-800`;
      case '진행 중':
        return `${baseStyle} bg-purple-100 text-purple-800`;
      default:
        return `${baseStyle} bg-gray-100 text-gray-800`;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-blue-600';
    if (score >= 70) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-purple-600';
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">스타트업 평가 현황</h2>
          <p className="text-gray-600">각 항목별 평가 결과와 주요 지표</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {evaluationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.category} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-800">{item.category}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={getStatusStyle(item.status)}>{item.status}</span>
                    <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}점</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">주요 지표</h4>
                  <ul className="space-y-2">
                    {item.keyMetrics.map((metric, index) => (
                      <li key={index} className="text-sm text-gray-600">• {metric}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">평가 기준 가이드</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(criteriaGuide).map(([status, description]) => (
              <div key={status} className="flex items-start space-x-3">
                <span className={getStatusStyle(status)}>{status}</span>
                <span className="text-sm text-gray-600">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDashboard;