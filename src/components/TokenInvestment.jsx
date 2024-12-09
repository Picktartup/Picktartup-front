import React, { useState } from 'react';
import {
  UserCircle, Wallet, Shield, CheckCircle,
  CreditCard, Coins, LineChart, FileCheck,
  Lock, History, Timer, Repeat, Search,
  Key, FileText, PenTool
} from 'lucide-react';

const TokenInvestment = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handlePrevStep = () => setActiveStep(prev => Math.max(1, prev - 1));
  const handleNextStep = () => setActiveStep(prev => Math.min(5, prev + 1));

  const steps = [
    {
      number: 1,
      title: '회원가입',
      subtitle: '회원가입과 함께 자동으로 블록체인 지갑이 생성됩니다',
      points: [
        '간편한 회원가입으로 즉시 시작하세요',
        '안전한 블록체인 지갑이 자동으로 생성됩니다',
        '복잡한 설정 없이 바로 시작할 수 있습니다',
        '은행 계좌처럼 쉽고 안전한 디지털 자산 관리가 가능합니다',
      ],
    },
    {
      number: 2,
      title: '토큰 구매',
      subtitle: '투자를 위한 토큰을 구매하세요',
      points: [
        '1 PK = 100원',
        '구매한 토큰은 즉시 지갑에 반영',
      ],
    },
    {
      number: 3,
      title: '스타트업 투자',
      subtitle: '원하는 스타트업에 토큰으로 투자하세요',
      points: [
        '투자 가능한 스타트업 목록 확인',
        '지갑 비밀번호로 안전한 투자 진행',
        '투자 수량 설정 및 계약서 확인',
        '전자서명으로 간편한 계약 체결',
        '실시간 투자 현황 모니터링',
      ],
    },
    {
      number: 4,
      title: '계약 체결',
      subtitle: '목표 달성 시 자동 계약 체결됩니다.',
      points: [
        '실시간 투자 진행률 모니터링',
        '목표 금액 달성 시 자동 계약 체결',
        '블록체인에 영구 기록',
        '투자 이력 관리',
      ],
    },
    {
      number: 5,
      title: '투자금 회수',
      subtitle: '계약 기간 종료 후 자동으로 투자금이 회수됩니다',
      points: [
        '약속된 계약 기간 만료 시 자동 회수',
        '수익금과 함께 지갑으로 즉시 입금',
        '회수된 토큰은 자유롭게 활용 가능',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">투자 프로세스 A to Z</h1>
          <h2 className="text-lg mb-1">안전하고 투명한 블록체인 투자 프로세스</h2>
          <p className="text-gray-600">투자의 모든 과정을 5단계로 쉽게 알아보세요!</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevStep}
            className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors ${
              activeStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
            disabled={activeStep === 1}
          >
            &lt;
          </button>
          <button
            onClick={handleNextStep}
            className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors ${
              activeStep === 5 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
            disabled={activeStep === 5}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left Navigation */}
        <div className="w-1/3 pr-6">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div
                onClick={() => setActiveStep(step.number)}
                className={`flex items-start mb-12 cursor-pointer ${
                  step.number === activeStep ? '' : 'opacity-50'
                }`}
              >
                <div className="mr-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.number === activeStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">STEP {step.number}</div>
                  <div className="font-medium">{step.title}</div>
                </div>
                {step.number < steps.length && (
                  <div className="absolute left-4 top-8 w-px h-12 bg-gray-200" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Content */}
        <div className="w-2/3">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="inline-block px-3 py-1 bg-purple-50 text-purple-500 rounded mb-4">
              STEP {activeStep}. {steps[activeStep - 1].title}
            </div>
            <h3 className="text-xl font-bold mb-6">{steps[activeStep - 1].subtitle}</h3>

            <div className="space-y-4">
              {steps[activeStep - 1].points.map((point, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="text-purple-500 mt-1">✓</div>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInvestment;
