import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Users, Box, Lightbulb, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, Info, Book, HelpCircle } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { isTokenExpired } from "utils/jwtUtils";

const ssiFramework = {
  overview: {
    title: "스마트 스타트업 평가 지표 (SSI)",
    description: `
      SSI는 스타트업의 성장 단계별 특성을 고려한 종합 평가 지표입니다.
      글로벌/국내 투자 데이터를 기반으로 개발되었으며,
      4P(People/Product/Potential/Performance) 프레임워크를 통해 
      객관적인 평가가 가능하도록 설계되었습니다.
    `,
    source: "글로벌/국내 투자사 데이터 기반"
  },
  evaluationItems: [
    {
      category: 'People',
      icon: Users,
      description: '창업팀의 전문성과 실행력',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "• 팀 구성의 다양성",
            "• 관련 전공/경험 보유",
            "• 창업팀 간 상호 보완성"
          ],
          평가기준: "핵심 2-3인 창업팀 구성 완료"
        },
        SeriesA: {
          핵심지표: [
            "• 핵심인력 유지율 90%↑",
            "• 주요 포지션 채용 완료",
            "• 조직 문화 정립"
          ],
          평가기준: "10-30인 조직 운영 체계 구축"
        },
        SeriesB: {
          핵심지표: [
            "• 조직 확장 실행력",
            "• 인재 영입 경쟁력",
            "• 부서별 성과 관리"
          ],
          평가기준: "50인 이상 조직 운영 체계"
        }
      }
    },
    {
      category: 'Product',
      icon: Box,
      description: '제품/서비스의 경쟁력',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "• MVP 개발 완성도",
            "• 초기 사용자 피드백",
            "• 제품 차별성"
          ],
          평가기준: "베타 서비스 또는 프로토타입"
        },
        SeriesA: {
          핵심지표: [
            "• MAU 성장률",
            "• 재사용률/리텐션",
            "• NPS/사용자 만족도"
          ],
          평가기준: "PMF 검증 및 초기 트랙션"
        },
        SeriesB: {
          핵심지표: [
            "• 핵심 지표 안정성",
            "• 플랫폼 확장성",
            "• 기술 경쟁력"
          ],
          평가기준: "제품 확장 및 수익화"
        }
      }
    },
    {
      category: 'Potential',
      icon: Lightbulb,
      description: '시장 확장성과 성장성',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "• 시장 규모(TAM)",
            "• 문제 해결의 강도",
            "• 경쟁사 분석"
          ],
          평가기준: "검증 가능한 시장 기회"
        },
        SeriesA: {
          핵심지표: [
            "• 시장 침투율",
            "• 확장 가능성",
            "• 경쟁 우위요소"
          ],
          평가기준: "시장 점유율 성장세"
        },
        SeriesB: {
          핵심지표: [
            "• 신규 시장 개척",
            "• 진입장벽 구축",
            "• 파트너십 확보"
          ],
          평가기준: "시장 지배력 강화"
        }
      }
    },
    {
      category: 'Performance',
      icon: TrendingUp,
      description: '실질적 성과와 성장성',
      stageMetrics: {
        Seed: {
          핵심지표: [
            "• 초기 매출 발생",
            "• 고객 획득 비용",
            "• Burn Rate"
          ],
          평가기준: "수익 모델 검증 단계"
        },
        SeriesA: {
          핵심지표: [
            "• MoM 성장률",
            "• Unit Economics",
            "• Runway"
          ],
          평가기준: "매출 안정성 확보"
        },
        SeriesB: {
          핵심지표: [
            "• 매출 성장률",
            "• 영업이익률",
            "• 현금흐름"
          ],
          평가기준: "수익성 개선 단계"
        }
      }
    }
  ],
  gradingCriteria: {
    선구적: {
      정의: "해당 단계에서 요구되는 모든 지표에서 탁월한 성과 달성",
      특징: "업계 평균 대비 상위 25% 이상의 성과"
    },
    도약적: {
      정의: "대부분의 핵심 지표에서 목표치 달성",
      특징: "업계 평균 이상의 성과"
    },
    성장하는: {
      정의: "일부 핵심 지표에서 의미있는 성과 달성",
      특징: "성장 가능성 확인 단계"
    },
    기대되는: {
      정의: "기본적인 성장 지표 확인",
      특징: "잠재력 보유 단계"
    }
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

const SSIIndicator = ({ ssiData = {} }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentStage, setCurrentStage] = useState('seed');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !isTokenExpired(token)) {
      setShowContent(true);
    }
  }, []);

  const handleLogin = () => {
    navigate("/auth/sign-in");
  };

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
        { label: "전문성", value: 88, benchmark: 65 }
      ],
      keyPoints: {
        seed: [
          "핵심 인력 구성 완료",
          "관련 분야 경험 보유",
          "명확한 역할 분담"
        ],
        seriesA: [
          "산업 경험 3년↑",
          "핵심인력 유지율 90%↑",
          "주요 포지션 채용 완료"
        ],
        seriesB: [
          "산업 경험 5년↑",
          "핵심인력 유지율 85%↑",
          "조직 확장 실행력"
        ]
      },
      summary: {
        strength: "풍부한 산업 경험과 높은 팀 안정성",
        focus: "지속적인 전문성 강화",
        stageSpecific: {
          seed: "초기 팀 구성과 역량 검증",
          seriesA: "조직 확장과 시스템 구축",
          seriesB: "조직 안정화와 성과 관리"
        }
      }
    },
    {
      title: "Product (제품)",
      icon: Box,
      grade: "도약적",
      metrics: [
        { label: "기술력", value: 82, benchmark: 65 },
        { label: "시장성", value: 78, benchmark: 60 },
        { label: "확장성", value: 85, benchmark: 70 },
        { label: "완성도", value: 75, benchmark: 60 }
      ],
      keyPoints: {
        seed: [
          "MVP 개발 완료",
          "초기 사용자 확보",
          "핵심 기능 검증"
        ],
        seriesA: [
          "월 사용자 증가율 20%↑",
          "재사용률 40%↑",
          "사용자 만족도 4.0↑"
        ],
        seriesB: [
          "안정적 서비스 운영",
          "핵심 지표 달성",
          "플랫폼 확장성"
        ]
      },
      summary: {
        strength: "독자적 기술력과 높은 확장성",
        focus: "제품 완성도 향상",
        stageSpecific: {
          seed: "시장 검증과 제품 개선",
          seriesA: "서비스 안정화와 확장",
          seriesB: "플랫폼화와 신규 기능"
        }
      }
    },
    {
      title: "Potential (성장성)",
      icon: Lightbulb,
      grade: "성장하는",
      metrics: [
        { label: "시장규모", value: 75, benchmark: 60 },
        { label: "성장률", value: 85, benchmark: 70 },
        { label: "진입장벽", value: 70, benchmark: 55 },
        { label: "경쟁력", value: 80, benchmark: 65 }
      ],
      keyPoints: {
        seed: [
          "시장 기회 검증",
          "성장 가능성 확인",
          "차별화 요소 보유"
        ],
        seriesA: [
          "시장 규모 1000억↑",
          "연간 성장률 15%↑",
          "진입장벽 구축"
        ],
        seriesB: [
          "시장 규모 5000억↑",
          "연간 성장률 20%↑",
          "시장 지배력 확보"
        ]
      },
      summary: {
        strength: "높은 시장 성장성과 진입장벽",
        focus: "시장 지배력 강화",
        stageSpecific: {
          seed: "시장 기회 검증",
          seriesA: "시장 점유율 확대",
          seriesB: "시장 지배력 강화"
        }
      }
    },
    {
      title: "Performance (성과)",
      icon: TrendingUp,
      grade: "기대되는",
      metrics: [
        { label: "매출", value: 65, benchmark: 55 },
        { label: "수익성", value: 70, benchmark: 60 },
        { label: "성장성", value: 85, benchmark: 70 },
        { label: "안정성", value: 75, benchmark: 65 }
      ],
      keyPoints: {
        seed: [
          "매출 발생 시작",
          "비즈니스 모델 검증",
          "초기 고객 확보"
        ],
        seriesA: [
          "매출 성장률 100%↑",
          "수익성 개선 중",
          "Unit Economics 검증"
        ],
        seriesB: [
          "매출 성장률 50%↑",
          "영업이익률 10%↑",
          "안정적 현금흐름"
        ]
      },
      summary: {
        strength: "높은 성장률과 수익성",
        focus: "매출 확대",
        stageSpecific: {
          seed: "수익모델 검증",
          seriesA: "매출 확대",
          seriesB: "수익성 강화"
        }
      }
    }
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

          {/* 평가 기준 상세 내용 */}
          {showCriteria && (
            <div className="mt-4 space-y-4 bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                {['Seed', 'SeriesA', 'SeriesB'].map((stage) => (
                  <div
                    key={stage}
                    className={`p-4 rounded-lg ${currentStage === stage.toLowerCase() ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {stage} 단계 평가 기준
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">핵심 지표</h5>
                        {ssiFramework.evaluationItems
                          .find(item => item.category === category.title.split(' ')[0])
                          ?.stageMetrics[stage].핵심지표.map((item, idx) => (
                            <p key={idx} className="text-sm text-gray-600">{item}</p>
                          ))
                        }
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">평가 기준</h5>
                        <p className="text-sm text-gray-600">
                          {ssiFramework.evaluationItems
                            .find(item => item.category === category.title.split(' ')[0])
                            ?.stageMetrics[stage].평가기준
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 등급 체계 설명 */}
                <div className="mt-6 bg-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">등급 체계 설명</h4>
                  {Object.entries(ssiFramework.gradingCriteria).map(([grade, info]) => (
                    <div key={grade} className="mb-3">
                      <span className={`${getGradeColor(grade)} px-2 py-1 rounded text-sm inline-block mb-1`}>
                        {grade}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{info.정의}</p>
                      <p className="text-sm text-gray-500">{info.특징}</p>
                    </div>
                  ))}
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
            onClick={handleLogin}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-semibold"
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

      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="font-semibold">성장 단계 선택</span>
          <select
            value={currentStage}
            onChange={(e) => setCurrentStage(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="seed">Seed</option>
            <option value="seriesA">Series A</option>
            <option value="seriesB">Series B</option>
          </select>
        </div>
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
    </div>
  );
};

export default SSIIndicator;