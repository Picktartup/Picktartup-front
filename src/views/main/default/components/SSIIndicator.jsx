import React, { useState } from 'react';
import { TrendingUp, Users, Box, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const SSIIndicator = ({ ssiData = {} }) => {
  const [showContent, setShowContent] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());


  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };


  const {
    people_grade = '진행 중',
    product_grade = '진행 중',
    performance_grade = '진행 중',
    potential_grade = '진행 중',
  } = ssiData;

  const evaluationItems = [
    {
      category: 'People',
      icon: Users,
      status: people_grade,
      description: '창업자와 핵심 팀원의 경력, 팀워크, 리더십을 평가',
      keyMetrics: [
        { label: '팀 경력', value: '5년 이상' },
        { label: '협업 능력', value: '95%' },
        { label: '리더십', value: '우수' },
      ],
      criteria: {
        우수: '창업자와 핵심 팀원이 해당 산업에서 5년 이상 활동했으며, 관련 분야에서 성공적인 이력이나 신뢰도가 높음',
        양호: '팀 경력이 2~5년 정도이고, 특정 부분에서 경험이 부족하지만 나머지 부분은 우수함',
        보통: '창업자와 팀원이 산업 내 경력이 1~2년 정도이거나, 팀 내 결속력이 부족함',
        '진행 중': '창업자와 팀의 경력이 부족하고, 협업에 문제가 있어 회사 성장에 위험 요소가 있음',
      },
    },
    {
      category: 'Product',
      icon: Box,
      status: product_grade,
      description: '제품/서비스의 개발 단계, 시장 적합성, 사용자 반응을 평가',
      keyMetrics: [
        { label: '제품 개발 단계', value: '베타 버전' },
        { label: 'MAU 증가율', value: '20%' },
        { label: '사용자 피드백', value: '긍정적' },
      ],
      criteria: {
        우수: '제품이 베타 버전 이상으로 출시되어 있고, MAU가 20% 이상 증가하는 추세를 보임',
        양호: '제품이 프로토타입 또는 초기 출시 단계이며, MAU가 10% 이상 증가 중',
        보통: '제품이 초기 개발 단계이며, MAU와 사용자 피드백이 부족함',
        '진행 중': '제품이 아이디어 단계이거나, 구체적인 피드백을 받지 못하고 있음',
      },
    },
    {
      category: 'Performance',
      icon: TrendingUp,
      status: performance_grade,
      description: '매출, 수익성, 거래량 등 실질적인 성과를 평가',
      keyMetrics: [
        { label: '매출 성장률', value: '10%' },
        { label: '수익성', value: '15%' },
        { label: '거래량', value: '500만 건' },
      ],
      criteria: {
        우수: '매출 성장률이 월 10% 이상으로 유지되고 있으며, 거래량이 상장 목표의 80% 이상 달성',
        양호: '매출이 발생하고 있지만, 예측보다 낮거나 일정 부분만 달성됨',
        보통: '매출은 발생하지 않거나, 예측 대비 50% 이하의 실적을 기록',
        '진행 중': '매출이 발생하지 않았으며, 손익 구조가 불확실함',
      },
    },
    {
      category: 'Potential',
      icon: Lightbulb,
      status: potential_grade,
      description: '시장 성장성, 산업 경쟁력, 장기 비전을 평가',
      keyMetrics: [
        { label: '시장 성장률', value: '15%' },
        { label: '경쟁력', value: '상위 20%' },
        { label: '장기 비전', value: '명확' },
      ],
      criteria: {
        우수: '시장 성장률이 15% 이상으로 예상되며, 회사가 경쟁 우위에 있음',
        양호: '시장 성장률이 10~15% 정도이고, 경쟁에서 일정 정도 우위를 가짐',
        보통: '시장 성장률이 5~10% 사이이며, 경쟁에서 뒤처지고 있음',
        '진행 중': '시장 성장률이 낮거나, 경쟁에서 불리하며 장기 비전이 불확실',
      },
    },
  ];

  const getCompanyType = () => {
    const grades = {
      우수: 3,
      양호: 2,
      보통: 1,
      '진행 중': 0,
    };

    let maxGrade = -1;
    let topCategory = null;

    Object.entries({
      People: people_grade,
      Product: product_grade,
      Performance: performance_grade,
      Potential: potential_grade,
    }).forEach(([category, grade]) => {
      const gradeValue = grades[grade] || 0;
      if (gradeValue > maxGrade) {
        maxGrade = gradeValue;
        topCategory = category;
      }
    });

    const types = {
      People: { name: '든든기업', description: '탄탄한 팀워크와 경험이 돋보이는 기업' },
      Product: { name: '활발기업', description: '혁신적인 제품과 높은 성장성을 보유한 기업' },
      Performance: { name: '실속기업', description: '안정적인 매출과 수익을 창출하는 기업' },
      Potential: { name: '펄럭기업', description: '미래 성장 가능성이 매우 높은 기업' },
    };

    return {
      ...types[topCategory || 'People'],
      category: topCategory || 'People',
    };
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


  if (!showContent) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-600">
          기업 분석자료를 확인하기 위해서는 로그인이 필요합니다 
        </p>
        <button
          onClick={() => setShowContent(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          로그인하기
        </button>
      </div>
    );
  }

  const companyType = getCompanyType();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-blue-600">{companyType.name}</span>
            <span className="text-gray-600">- {companyType.description}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {companyType.category} 분야에서 가장 높은 등급을 기록했습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {evaluationItems.map((item) => {
          const IconComponent = item.icon;
          const isExpanded = expandedCategories.has(item.category);

          return (
            <div key={item.category} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{item.category}</h3>
                </div>
                <span className={getStatusStyle(item.status)}>{item.status}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">주요 지표</h4>
                <ul className="space-y-2">
                  {item.keyMetrics.map((metric, index) => (
                    <li key={index} className="text-sm text-gray-600 flex justify-between">
                      <span>• {metric.label}</span>
                      <span className="font-medium text-gray-800">{metric.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => toggleCategory(item.category)}
                className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                {isExpanded ? (
                  <>
                    평가 기준 접기
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    평가 기준 보기
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
              {isExpanded && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">평가 기준</h4>
                  {Object.entries(item.criteria).map(([status, description]) => (
                    <div key={status} className="mb-3">
                      <span className={`${getStatusStyle(status)} inline-block mb-1`}>{status}</span>
                      <p className="text-sm text-gray-600 ml-1">{description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SSIIndicator;
