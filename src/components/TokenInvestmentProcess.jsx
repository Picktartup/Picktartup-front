import React, { useState } from 'react';
import { UserCircle, Wallet, Shield, CheckCircle, CreditCard, Coins, LineChart, FileCheck, Lock, History, Timer, Repeat, Search, Key, FileText } from 'lucide-react';

const Card = ({ title, icon, description }) => (
    <div className="flex flex-col items-center p-3 bg-white rounded-lg">
        <div className="text-purple-500 mb-2">
            {React.cloneElement(icon, { className: "w-10 h-10" })}
        </div>
        <h3 className="font-bold text-center text-base mb-2">{title}</h3>
        <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
);

const InvestmentProcess = () => {
    const [activeStep, setActiveStep] = useState(1);

    const handlePrevStep = () => setActiveStep(prev => Math.max(1, prev - 1));
    const handleNextStep = () => setActiveStep(prev => Math.min(5, prev + 1));

    const steps = [
        {
            number: 1,
            title: '회원가입',
            subtitle: '회원가입과 함께 자동으로 블록체인 지갑이 생성됩니다!',
            cards: [
                { title: '간편 회원가입', icon: <UserCircle />, description: '3분만에 빠른 회원가입' },
                { title: '자동 지갑생성', icon: <Wallet />, description: '블록체인 지갑 자동 생성' },
            ]
        },
        {
            number: 2,
            title: '토큰 구매',
            subtitle: '투자를 위한 토큰을 구매하세요',
            cards: [
                { title: '토큰 구매', icon: <CreditCard />, description: '원하는 만큼 구매 가능' },
                { title: '즉시 지급', icon: <Coins />, description: '구매 즉시 지갑으로 지급' },
            ]
        },
        {
            number: 3,
            title: '스타트업 투자',
            subtitle: '원하는 스타트업에 토큰으로 투자하세요',
            cards: [
                { title: '투자처 검색', icon: <Search />, description: '원하는 스타트업 검색' },
                { title: '계약서 확인', icon: <FileText />, description: '투자 계약서 검토' },
            ]
        },
        {
            number: 4,
            title: '계약 체결',
            subtitle: '목표 달성 시 자동 계약 체결',
            cards: [
                { title: '자동 계약', icon: <FileCheck />, description: '목표액 달성 시 자동 체결' },
                { title: '안전한 이력 관리', icon: <History />, description: '투자 내역 실시간 확인' },
            ]
        },
        {
            number: 5,
            title: '투자금 회수',
            subtitle: '계약 기간 종료 후 자동으로 투자금이 회수됩니다',
            cards: [
                { title: '수익금 입금', icon: <Wallet />, description: '투자금 자동 입금' },
                { title: '자유로운 활용', icon: <Repeat />, description: '재투자/출금 선택' },
            ]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white-50">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">투자 프로세스 A to Z</h1>
                <p className="text-gray-600">투자의 모든 과정을 5단계로 쉽게 알아보세요!</p>
            </div>

            <div className="flex">
                <div className="w-1/3 pr-6">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            <div
                                onClick={() => setActiveStep(step.number)}
                                className={`flex items-start mb-12 cursor-pointer ${step.number === activeStep ? '' : 'opacity-50'}`}
                            >
                                <div className="mr-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.number === activeStep ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                                        {step.number}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">STEP {step.number}</div>
                                    <div className="font-medium">{step.title}</div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="absolute left-4 top-8 w-px h-12 bg-gray-200" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-2/3">
                    <div className="bg-white rounded-lg p-6">
                        <div className="inline-block px-3 py-1 bg-purple-50 text-purple-500 rounded mb-4">
                            {activeStep}. {steps[activeStep - 1].title}
                        </div>
                        <h3 className="text-lg font-bold mb-6">{steps[activeStep - 1].subtitle}</h3>
                        <div className="grid grid-cols-2 gap-2 p-6">
                            {steps[activeStep - 1].cards.map((card, index) => (
                                <Card key={index} {...card} />
                            ))}
                        </div>
                        <div className="flex justify-center items-center mt-6 space-x-4">
                            <button
                                onClick={handlePrevStep}
                                className={`px-4 py-2 rounded ${activeStep === 1
                                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                                }`}
                                disabled={activeStep === 1}
                            >
                                이전
                            </button>
                            <span className="text-sm text-gray-500">{activeStep} / {steps.length}</span>
                            <button
                                onClick={handleNextStep}
                                className={`px-4 py-2 rounded ${activeStep === steps.length
                                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                                }`}
                                disabled={activeStep === steps.length}
                            >
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentProcess;