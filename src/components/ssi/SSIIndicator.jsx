import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  TrendingUp, 
  Rocket,
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';

const EvaluationDashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const evaluationData = [
    {
      category: 'People',
      icon: Users,
      status: '우수',
      score: 95,
      trend: 'up',
      keyMetrics: [
        { label: '팀 경력', value: '5년+', status: '우수' },
        { label: '협업 지수', value: '95%', status: '우수' },
        { label: '리더십', value: '90%', status: '우수' }
      ],
      details: [
        '산업 경력 5년 이상 보유',
        'IPO 성공 경험 보유',
        '팀 협업 시스템 구축',
        '명확한 역할 분담'
      ],
      criteriaDetails: {
        우수: '5년+ 경력, IPO 경험',
        양호: '2-5년 경력',
        보통: '1-2년 경력',
        진행중: '경력/협업 부족'
      }
    },
    {
      category: 'Product',
      icon: Package,
      status: '양호',
      score: 80,
      trend: 'up',
      keyMetrics: [
        { label: 'MAU 성장률', value: '20%', status: '양호' },
        { label: '유저 만족도', value: '4.5/5', status: '우수' },
        { label: '유지율', value: '45%', status: '양호' }
      ],
      details: [
        '베타 버전 출시 완료',
        '긍정적 초기 피드백',
        'MAU 20% 성장',
        '핵심 기능 안정화'
      ],
      criteriaDetails: {
        우수: 'MAU 30%+, 유지율 60%+',
        양호: 'MAU 10%+, 유지율 30-50%',
        보통: '초기 개발 단계',
        진행중: '아이디어 단계'
      }
    },
    {
      category: 'Performance',
      icon: TrendingUp,
      status: '보통',
      score: 60,
      trend: 'up',
      keyMetrics: [
        { label: '매출 성장률', value: '8%', status: '보통' },
        { label: '거래량', value: '↑15%', status: '양호' },
        { label: '수익률', value: '5%', status: '보통' }
      ],
      details: [
        '초기 매출 발생',
        '거래량 증가 추세',
        '수익성 개선 필요',
        '시장 점유율 확대 중'
      ],
      criteriaDetails: {
        우수: '월 성장률 10%+',
        양호: '예상 대비 80%',
        보통: '예상 대비 50%',
        진행중: '매출 미발생'
      }
    },
    {
      category: 'Potential',
      icon: Rocket,
      status: '진행 중',
      score: 40,
      trend: 'stable',
      keyMetrics: [
        { label: '시장 성장률', value: '15%', status: '우수' },
        { label: '경쟁력 지수', value: '진행중', status: '진행 중' },
        { label: '비전 완성도', value: '40%', status: '진행 중' }
      ],
      details: [
        '시장 성장률 15% 예상',
        '경쟁력 확보 진행 중',
        '장기 비전 수립 중',
        '시장 진입 전략 개발'
      ],
      criteriaDetails: {
        우수: '시장 성장률 15%+',
        양호: '성장률 10-15%',
        보통: '성장률 5-10%',
        진행중: '성장률 5% 미만'
      }
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case '우수': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case '양호': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case '보통': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case '진행 중': return <Clock className="w-5 h-5 text-purple-500" />;
      default: return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '우수': return 'bg-blue-500';
      case '양호': return 'bg-green-500';
      case '보통': return 'bg-yellow-500';
      case '진행 중': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case '우수': return 'bg-blue-50';
      case '양호': return 'bg-green-50';
      case '보통': return 'bg-yellow-50';
      case '진행 중': return 'bg-purple-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">스타트업 평가 대시보드</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {evaluationData.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.category}
              className={`rounded-xl shadow-sm transition-all duration-200 ${
                getStatusBg(item.status)
              } border-l-4 ${getStatusColor(item.status)} hover:shadow-md`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === item.category ? null : item.category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getStatusBg(item.status)}`}>
                      <Icon className={`w-6 h-6 ${getStatusColor(item.status)} bg-opacity-20`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.category}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(item.status)}
                        <span className="text-sm font-medium">{item.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{item.score}</div>
                      <div className="text-sm text-gray-500">총점</div>
                    </div>
                    {expandedCard === item.category ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(item.status)}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                {/* Key Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {item.keyMetrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${getStatusBg(metric.status)} border border-opacity-20 ${
                        getStatusColor(metric.status)
                      }`}
                    >
                      <div className="text-sm text-gray-600">{metric.label}</div>
                      <div className="text-lg font-semibold mt-1">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {expandedCard === item.category && (
                <div className="px-6 pb-6 pt-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">현재 상태</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">평가 기준</h4>
                      <div className="space-y-2">
                        {Object.entries(item.criteriaDetails).map(([grade, criterion]) => (
                          <div key={grade} className="flex items-start space-x-2">
                            {getStatusIcon(grade)}
                            <span className="font-medium min-w-[60px]">{grade}:</span>
                            <span>{criterion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluationDashboard;