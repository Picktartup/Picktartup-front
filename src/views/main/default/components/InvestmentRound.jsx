import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Info } from 'lucide-react';

const CustomTooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200 -translate-x-1/2 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

const InvestmentRoundTimeline = ({ startupId, onRoundChange }) => {
  const [investmentData, setInvestmentData] = useState([]);
  const [currentRound, setCurrentRound] = useState('');

  const roundConfig = {
    Seed: {
      size: 8,
      color: 'bg-cyan-500',
      description: '초기 단계의 투자 라운드로, 스타트업의 아이디어나 초기 제품 개발을 위한 자금을 조달합니다.',
    },
    'Pre-A': {
      size: 10,
      color: 'bg-blue-500',
      description: 'Series A 이전 단계로, 제품/서비스의 시장 검증과 초기 성장을 위한 투자 단계입니다.',
    },
    'Series A': {
      size: 12,
      color: 'bg-indigo-500',
      description: '스타트업이 제품/서비스의 시장 적합성을 입증하고 성장을 가속화하기 위한 단계입니다.',
    },
    'Series B': {
      size: 14,
      color: 'bg-purple-500',
      description: '검증된 비즈니스 모델을 바탕으로 시장 확장과 규모 확대를 위한 투자 단계입니다.',
    },
    'Series C': {
      size: 16,
      color: 'bg-green-500',
      description: '큰 규모의 시장 확장, 신규 시장 진출, 또는 인수합병을 위한 후기 단계 투자입니다.',
    },
    지원금: {
      size: 18,
      color: 'bg-pink-500',
      description: '정부나 기타 기관에서 제공하는 지원 자금을 통해 사업을 초기화하거나 확장합니다.',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startupResponse, metricsResponse] = await Promise.all([
          axios.get(`https://picktartup.com/api/v1/startups/${startupId}`),
          axios.get(`https://picktartup.com/api/v1/startups/${startupId}/metrics/annual`),
        ]);

        const sortedData = metricsResponse.data.sort((a, b) => a.year - b.year);
        setInvestmentData(sortedData);

        const startupData = startupResponse.data.data;
        const round = startupData?.current_round || '정보 없음'; // 올바르게 정의된 round
        setCurrentRound(round);

        // 부모 컴포넌트로 라운드 알림
        if (typeof onRoundChange === 'function') {
          onRoundChange(round); // 여기서 호출
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCurrentRound('정보 없음');
      }
    };

    fetchData();
  }, [startupId, onRoundChange]);

  const generalRoundDescription = `투자 라운드는 스타트업의 성장 단계를 나타내며, 
    Seed부터 Series C까지 단계별로 투자 규모와 기업 가치가 
    증가합니다. 각 단계는 기업의 성장과 확장을 위한 자금을 
    제공합니다.`;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      {/* Current Round Display */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-900">현재 투자 라운드 : {currentRound}</h2>
          <CustomTooltip
            content={
              <div>
                <h3 className="font-bold mb-2">투자 라운드란?</h3>
                <p className="text-sm text-gray-600">{generalRoundDescription}</p>
              </div>
            }
          >
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </CustomTooltip>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-gray-500">투자</div>
          <div className="text-2xl font-bold text-purple-600">{currentRound}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute h-px bg-gray-300 left-0 right-0 top-1/2 transform -translate-y-1/2" />
        <div className="flex justify-center gap-12 relative items-center">
          {investmentData.map((data, index) => {
            const config = roundConfig[data.investmentRound] || { size: 8, color: 'bg-gray-600', description: '' };
            return (
              <div key={index} className="flex flex-col items-center">
                <CustomTooltip
                  content={
                    <div>
                      <h3 className="font-bold mb-2">{data.investmentRound}</h3>
                      <p className="text-sm text-gray-600">{config.description}</p>
                    </div>
                  }
                >
                  <div
                    className={`rounded-full flex items-center justify-center ${config.color} 
                                text-white font-medium transition-all hover:scale-105 cursor-help
                                shadow-md hover:shadow-lg relative z-10`}
                    style={{
                      width: `${config.size}rem`,
                      height: `${config.size}rem`,
                      fontSize: `${0.875 + (config.size - 8) * 0.05}rem`,
                    }}
                  >
                    {data.investmentRound}
                  </div>
                </CustomTooltip>
                <div className="mt-4 text-gray-500 text-sm">{data.year.toString().substring(2)}'</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-12">
        {Object.entries(roundConfig).map(([round, { color }]) => (
          <div key={round} className="flex items-center gap-2">
            <div className={`w-2 h-2 ${color} rounded-full`} />
            <span className="text-sm text-gray-600">{round}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentRoundTimeline;
