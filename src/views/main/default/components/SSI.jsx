import React, { useState } from 'react'; // React와 useState 가져오기
import { Users, Box, Lightbulb, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'; // 아이콘
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts'; // Recharts 컴포넌트

const ssiFramework = {
  overview: {
    title: "스마트 스타트업 평가 지표 (SSI)",
    description: 
      "SSI는 스타트업의 성장 단계별 특성을 고려한 종합 평가 지표입니다.\n글로벌/국내 투자 데이터를 기반으로 개발되었으며,\n4P(People/Product/Potential/Performance) 프레임워크를 통해\n객관적인 평가가 가능하도록 설계되었습니다.",
    source: "글로벌/국내 투자사 데이터 기반",
  },
  evaluationItems: [
    {
      category: 'People',
      icon: Users,
      description: '창업팀의 전문성과 실행력',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "팀 구성의 다양성",
            "관련 전공/경험 보유",
            "창업팀 간 상호 보완성",
          ],
          평가기준: "핵심 2-3인 창업팀 구성 완료",
        },
        PreA: {
          핵심지표: [
            "조직 유지율 85%↑",
            "핵심 팀원 역량 강화",
            "외부 컨설턴트 도입",
          ],
          평가기준: "5-10인 팀 안정화",
        },
        SeriesA: {
          핵심지표: [
            "핵심인력 유지율 90%↑",
            "C-Level 포지션 채용 완료",
            "조직 문화 강화",
          ],
          평가기준: "10-30인 조직 운영 체계 구축",
        },
        SeriesB: {
          핵심지표: [
            "조직 확장 실행력",
            "인재 영입 경쟁력",
            "부서별 성과 관리 체계",
          ],
          평가기준: "50인 이상 조직 운영 체계",
        },
        SeriesC: {
          핵심지표: [
            "고위 경영진 확충",
            "글로벌 전문가 영입",
            "조직 효율성 최적화",
          ],
          평가기준: "100인 이상 조직 운영 체계 구축",
        },
      },
    },
    {
      category: 'Product',
      icon: Box,
      description: '제품/서비스의 경쟁력',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "MVP 개발 완성도",
            "초기 사용자 피드백 수집",
            "제품 차별성",
          ],
          평가기준: "베타 서비스 또는 프로토타입",
        },
        PreA: {
          핵심지표: [
            "기능 안정성 개선",
            "초기 시장 적합성 검증",
            "고객 피드백 반영",
          ],
          평가기준: "초기 제품/서비스 출시",
        },
        SeriesA: {
          핵심지표: [
            "MAU 1,000명↑",
            "재사용률 50%↑",
            "NPS 50 이상",
          ],
          평가기준: "시장 적합성(Product-Market Fit) 검증",
        },
        SeriesB: {
          핵심지표: [
            "핵심 지표 안정성",
            "플랫폼 확장성",
            "기술 경쟁력",
          ],
          평가기준: "제품 확장 및 수익화",
        },
        SeriesC: {
          핵심지표: [
            "글로벌 시장 출시 준비",
            "제품 라인 다각화",
            "유지보수 시스템 강화",
          ],
          평가기준: "글로벌 지원 체계 확보",
        },
      },
    },
    {
      category: 'Potential',
      icon: Lightbulb,
      description: '시장 확장성과 성장성',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "시장 규모(TAM) 정의",
            "문제 해결 강도 검증",
            "경쟁사 분석",
          ],
          평가기준: "검증 가능한 시장 기회 확인",
        },
        PreA: {
          핵심지표: [
            "시장 성장률 검증",
            "사용자 기반 확장",
            "시장 침투 초기화",
          ],
          평가기준: "초기 시장 점유율 확보",
        },
        SeriesA: {
          핵심지표: [
            "시장 침투율 증가",
            "성장 가능성 확대",
            "시장 차별화 요인 개발",
          ],
          평가기준: "시장 점유율 성장세 유지",
        },
        SeriesB: {
          핵심지표: [
            "신규 시장 진입 성공",
            "진입장벽 구축",
            "글로벌 파트너십 확보",
          ],
          평가기준: "시장 지배력 확대",
        },
        SeriesC: {
          핵심지표: [
            "시장 점유율 15%↑",
            "지속 가능한 시장 확장성",
            "산업 내 경쟁우위 확보",
          ],
          평가기준: "시장 선도기업으로 자리매김",
        },
      },
    },
    {
      category: 'Performance',
      icon: TrendingUp,
      description: '실질적 성과와 수익성',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "초기 매출 발생",
            "고객 획득 비용(CAC) 검증",
            "Burn Rate 관리",
          ],
          평가기준: "수익 모델 검증 완료",
        },
        PreA: {
          핵심지표: [
            "매출 성장 초기화",
            "운영 효율성 증가",
            "Runway 안정성 확보",
          ],
          평가기준: "초기 매출 성과",
        },
        SeriesA: {
          핵심지표: [
            "MoM 성장률 15%↑",
            "LTV/CAC 비율 3.0↑",
            "영업 이익률 개선",
          ],
          평가기준: "매출 안정성 확보",
        },
        SeriesB: {
          핵심지표: [
            "영업 이익률 10%↑",
            "현금 흐름 안정화",
            "수익성 지표 달성",
          ],
          평가기준: "지속 가능한 수익성 확보",
        },
        SeriesC: {
          핵심지표: [
            "연 매출 100억 이상",
            "글로벌 매출 확대",
            "지속 가능 경영 체계 구축",
          ],
          평가기준: "산업 내 수익성 선도",
        },
      },
    },
  ],
  gradingCriteria: {
    선구적: {
      정의: "모든 단계에서 탁월한 성과를 기록하며 산업을 선도함",
      특징: "최상위 10% 기업에 속함",
    },
    도약적: {
      정의: "핵심 지표에서 대부분 목표를 초과 달성",
      특징: "산업 평균 이상의 성과 기록",
    },
    성장하는: {
      정의: "핵심 지표에서 일부 성과를 달성하며 가능성을 입증",
      특징: "성장 잠재력이 높은 기업",
    },
    기대되는: {
      정의: "초기 성과 창출 단계",
      특징: "장기적인 성장이 기대됨",
    },
  },

  keyConsiderations: {
    Seed: [
      "문제 해결의 명확성",
      "팀의 실행력",
      "시장 기회의 크기"
    ],
    SeriesA: [
      "Product-Market Fit",
      "초기 성장세",
      "확장 가능성"
    ],
    SeriesB: [
      "수익성 개선",
      "시장 지배력",
      "지속가능한 성장"
    ]
  }
};

const SSI = ({ gradingCriteria= ssiFramework.gradingCriteria  }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentStage, setCurrentStage] = useState('seed');

  const getGradeColor = (grade) => {
    const colors = {
      "선구적": "bg-blue-100 text-blue-800",
      "도약적": "bg-green-100 text-green-800",
      "성장하는": "bg-yellow-100 text-yellow-800",
      "기대되는": "bg-purple-100 text-purple-800"
    };
    return colors[grade] || "bg-gray-100 text-gray-800";
  };

  const categories = [
    {
      title: "People (팀)",
      icon: Users,
      grade: "선구적",
      metrics: [
        { label: "산업 경험", value: 90, benchmark: 70 },
        { label: "팀 안정성", value: 85, benchmark: 60 },
        { label: "실행력", value: 95, benchmark: 75 },
        { label: "전문성", value: 88, benchmark: 65 },
      ],
      keyPoints: {
        seed: [
          "핵심 인력 구성 완료",
          "관련 분야 경험 보유",
          "명확한 역할 분담",
        ],
        preA: [
          "산업 경험 2년↑",
          "핵심인력 유지율 85%↑",
          "주요 포지션 식별 및 채용 계획",
        ],
        seriesA: [
          "산업 경험 3년↑",
          "핵심인력 유지율 90%↑",
          "C-Level 포지션 채용 완료",
        ],
        seriesB: [
          "산업 경험 5년↑",
          "핵심인력 유지율 85%↑",
          "조직 확장 실행력",
        ],
        seriesC: [
          "글로벌 팀 구성 완료",
          "운영 효율성 90%↑",
          "조직의 상호 작용성 강화",
        ],
      },
      summary: {
        strength: "풍부한 산업 경험과 높은 팀 안정성",
        focus: "지속적인 전문성 강화",
        stageSpecific: {
          seed: "초기 팀 구성과 역량 검증",
          preA: "팀 역량 강화와 초기 안정화",
          seriesA: "조직 확장과 시스템 구축",
          seriesB: "조직 안정화와 성과 관리",
          seriesC: "글로벌 팀 운영 최적화",
        },
      },
    },
    {
      title: "Product (제품)",
      icon: Box,
      grade: "도약적",
      metrics: [
        { label: "기술력", value: 82, benchmark: 65 },
        { label: "시장성", value: 78, benchmark: 60 },
        { label: "확장성", value: 85, benchmark: 70 },
        { label: "완성도", value: 75, benchmark: 60 },
      ],
      keyPoints: {
        seed: [
          "MVP 개발 완료",
          "초기 사용자 확보",
          "핵심 기능 검증",
        ],
        preA: [
          "기능 안정성 개선",
          "사용자 피드백 반영",
          "시장 적합성 초기화",
        ],
        seriesA: [
          "월 사용자 증가율 20%↑",
          "재사용률 50%↑",
          "사용자 만족도 4.5↑",
        ],
        seriesB: [
          "안정적 서비스 운영",
          "핵심 지표 달성",
          "플랫폼 확장성 확보",
        ],
        seriesC: [
          "글로벌 제품 출시 준비",
          "제품 라인 확장",
          "기술 혁신 지원 체계 강화",
        ],
      },
      summary: {
        strength: "독자적 기술력과 높은 확장성",
        focus: "제품 완성도 향상",
        stageSpecific: {
          seed: "시장 검증과 제품 개선",
          preA: "제품 안정화와 초기 확장",
          seriesA: "서비스 안정화와 확장",
          seriesB: "플랫폼화와 신규 기능 도입",
          seriesC: "글로벌 지원 체계 확보",
        },
      },
    },
    {
      title: "Potential (성장성)",
      icon: Lightbulb,
      grade: "성장하는",
      metrics: [
        { label: "시장규모", value: 75, benchmark: 60 },
        { label: "성장률", value: 85, benchmark: 70 },
        { label: "진입장벽", value: 70, benchmark: 55 },
        { label: "경쟁력", value: 80, benchmark: 65 },
      ],
      keyPoints: {
        seed: [
          "시장 기회 검증",
          "성장 가능성 확인",
          "차별화 요소 보유",
        ],
        preA: [
          "시장 성장률 초기 분석",
          "사용자 기반 확장",
          "시장 침투율 5%↑",
        ],
        seriesA: [
          "시장 규모 1000억↑",
          "연간 성장률 15%↑",
          "진입장벽 구축",
        ],
        seriesB: [
          "시장 규모 5000억↑",
          "연간 성장률 20%↑",
          "시장 지배력 확보",
        ],
        seriesC: [
          "시장 점유율 15%↑",
          "지속 가능한 확장성 확보",
          "산업 내 경쟁 우위 확보",
        ],
      },
      summary: {
        strength: "높은 시장 성장성과 진입장벽",
        focus: "시장 지배력 강화",
        stageSpecific: {
          seed: "시장 기회 검증",
          preA: "초기 사용자 기반 확대",
          seriesA: "시장 점유율 확대",
          seriesB: "시장 지배력 강화",
          seriesC: "시장 선도기업으로 자리매김",
        },
      },
    },
    {
      title: "Performance (성과)",
      icon: TrendingUp,
      grade: "기대되는",
      metrics: [
        { label: "매출", value: 65, benchmark: 55 },
        { label: "수익성", value: 70, benchmark: 60 },
        { label: "성장성", value: 85, benchmark: 70 },
        { label: "안정성", value: 75, benchmark: 65 },
      ],
      keyPoints: {
        seed: [
          "매출 발생 시작",
          "비즈니스 모델 검증",
          "초기 고객 확보",
        ],
        preA: [
          "초기 매출 성장률 20%↑",
          "Unit Economics 수립",
          "초기 운영 안정성 확보",
        ],
        seriesA: [
          "매출 성장률 100%↑",
          "수익성 개선 중",
          "Unit Economics 검증 완료",
        ],
        seriesB: [
          "매출 성장률 50%↑",
          "영업이익률 10%↑",
          "안정적 현금흐름",
        ],
        seriesC: [
          "연 매출 100억 이상",
          "지속 가능한 수익성 모델",
          "글로벌 매출 확장",
        ],
      },
      summary: {
        strength: "높은 성장률과 수익성",
        focus: "매출 확대",
        stageSpecific: {
          seed: "수익 모델 검증",
          preA: "매출 초기화 및 안정화",
          seriesA: "매출 확대",
          seriesB: "수익성 강화",
          seriesC: "글로벌 수익 창출",
        },
      },
    },
  ];

  const WarningMessage = () => (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-lg shadow-lg">
      <div className="flex items-start">
        <AlertTriangle className="w-6 h-6 text-amber-500 mt-1 mr-3" />
        <div>
          <h3 className="font-bold text-amber-800 text-lg mb-2">투자자 유의사항</h3>
          <ul className="text-base text-amber-700 space-y-2">
            <li>
              본 SSI(Smart Startup Index) 지표는 <strong>픽타트업의 연구에 기반하여 개발된 참고 지표</strong>입니다.
            </li>
            <li>
              투자 판단에 참고용으로 활용하되, 최종적인 투자 결정은 <strong>본인의 판단과 책임하에 이루어져야 합니다.</strong>
            </li>
            <li>
              픽타트업은 <strong>투자 결과에 대한 책임을 지지 않습니다.</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  const CategoryCard = ({ category, currentStage }) => {
    const [showCriteria, setShowCriteria] = useState(false);
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* 카드 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <category.icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{category.title}</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(category.grade)}`}>
            {category.grade}
          </span>
        </div>
  
        {/* 레이더 차트 */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={category.metrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="label" />
              <Radar
                name="현재 수준"
                dataKey="value"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="업계 기준"
                dataKey="benchmark"
                stroke="#9ca3af"
                fill="#d1d5db"
                fillOpacity={0.3}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
  
        {/* 핵심 지표 */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">핵심 지표</h3>
            <div className="grid grid-cols-1 gap-2">
              {category.keyPoints[currentStage].map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* 요약 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-green-800 mb-1">강점</h4>
              <p className="text-sm text-green-600">{category.summary.strength}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">중점 사항</h4>
              <p className="text-sm text-blue-600">
                {category.summary.stageSpecific[currentStage]}
              </p>
            </div>
          </div>
  
          {/* 평가 기준 토글 버튼 */}
          <button
            onClick={() => setShowCriteria(!showCriteria)}
            className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {showCriteria ? '평가 기준 접기' : '평가 기준 보기'}
            </span>
            {showCriteria ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
  
          {showCriteria && (
  <div className="mt-4 space-y-4 bg-gray-50 rounded-lg p-4">
    <div className="p-4 rounded-lg bg-blue-50">
      <h4 className="font-semibold text-gray-800 mb-2">
        {currentStage.toUpperCase()} 단계 평가 기준
      </h4>
      <div className="space-y-4">
        {/* 현재 선택된 단계의 데이터 가져오기 */}
        {(() => {
          const stageData = ssiFramework.evaluationItems
            .find(item => item.category === category.title.split(' ')[0])
            ?.stageMetrics[
              currentStage.charAt(0).toUpperCase() + currentStage.slice(1) // 대문자로 변환 (Seed, PreA, 등)
            ];

          if (!stageData) {
            return (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-red-500 font-bold">해당 단계의 데이터를 찾을 수 없습니다.</p>
              </div>
            );
          }

          return (
            <div className="space-y-4">
              {/* 핵심 지표 */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">핵심 지표</h5>
                {stageData.핵심지표.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600">{item}</p>
                ))}
              </div>

              {/* 평가 기준 */}
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">평가 기준</h5>
                <p className="text-sm text-gray-600">{stageData.평가기준}</p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    );
  };
  
  if (!showContent) {
    return (
      <div className="p-6">
        <WarningMessage />
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8">
          <p className="text-gray-600 text-center mb-4">
            기업 분석자료를 확인하기 위해서는 로그인이 필요합니다.
          </p>
          <button
            onClick={() => setShowContent(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <WarningMessage />
      <div className="mb-6">
        <select
          value={currentStage}
          onChange={(e) => setCurrentStage(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="seed">Seed</option>
          <option value="preA">Pre-A</option>
          <option value="seriesA">Series A</option>
          <option value="seriesB">Series B</option>
          <option value="seriesC">Series C</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {categories.map((category, idx) => (
          <CategoryCard
            key={idx}
            category={category}
            currentStage={currentStage}
          />
        ))}
      </div>
      {/* 공통 기준 */}
      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">공통 평가 기준</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(gradingCriteria).map(([grade, info]) => (
            <div key={grade} className="bg-white rounded-lg p-4 shadow">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(grade)}`}>
                {grade}
              </span>
              <p className="text-sm text-gray-700 mt-2">{info.정의}</p>
              <p className="text-sm text-gray-500 mt-1">{info.특징}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SSI;