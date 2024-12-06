// import React, { useState } from 'react';
// // import {
// //     CreditCard, Coins, Wallet,
// //     Search, FileText, PenTool, CheckCircle, Key, Lock, LineChart, FileCheck, History, UserCircle, Timer, ArrowDownToLine, Repeat
// // } from 'lucide-react';
// import { UserCircle, Wallet, Shield, CheckCircle, CreditCard, Coins, LineChart, FileCheck, Lock, History, Timer, Repeat } from 'lucide-react';

// const Card = ({ title, icon, description }) => (
//  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
//    <div className="text-purple-500 mb-3">
//      {React.cloneElement(icon, { className: "w-12 h-12" })}
//    </div>
//    <h3 className="font-bold mb-2 text-center">{title}</h3>
//    <p className="text-sm text-gray-600 text-center">{description}</p>
//  </div>
// );


// const InvestmentProcess = () => {
//     const [activeStep, setActiveStep] = useState(1);

//     const handlePrevStep = () => {
//         setActiveStep(prev => Math.max(1, prev - 1));
//     };

//     const handleNextStep = () => {
//         setActiveStep(prev => Math.min(5, prev + 1));
//     };

//     const steps = [
//         {
//             number: 1,
//             title: '회원가입',
//             subtitle: '회원가입과 함께 자동으로 블록체인 지갑이 생성됩니다!',
//             points: [
//                 '간편한 회원가입으로 즉시 시작하세요',
//                 '안전한 블록체인 지갑이 자동으로 생성됩니다',
//                 '복잡한 설정 없이 바로 시작할 수 있습니다',
//                 '은행 계좌처럼 쉽고 안전한 디지털 자산 관리가 가능합니다'
//             ]
//         },
//         {
//             number: 2,
//             title: '토큰 구매',
//             subtitle: '투자를 위한 토큰을 구매하세요',
//             points: [
//                 '1 PK = 100원',
//                 '구매한 토큰은 즉시 지갑에 반영'
//             ]
//         },
//         {
//             number: 3,
//             title: '스타트업 투자',
//             subtitle: '원하는 스타트업에 토큰으로 투자하세요',
//             points: [
//                 '투자 가능한 스타트업 목록 확인',
//                 '지갑 비밀번호로 안전한 투자 진행',
//                 '투자 수량 설정 및 계약서 확인',
//                 '전자서명으로 간편한 계약 체결',
//                 '실시간 투자 현황 모니터링'
//             ]
//         },
//         {
//             number: 4,
//             title: '계약 체결',
//             subtitle: '목표 달성 시 자동 계약 체결',
//             points: [
//                 '실시간 투자 진행률 모니터링',
//                 '목표 금액 달성 시 자동 계약 체결',
//                 '블록체인에 영구 기록',
//                 '투자 이력 관리'
//             ]
//         },
//         {
//             number: 5,
//             title: '투자금 회수',
//             subtitle: '계약 기간 종료 후 자동으로 투자금이 회수됩니다',
//             points: [
//                 '약속된 계약 기간 만료 시 자동 회수',
//                 '수익금과 함께 지갑으로 즉시 입금',
//                 '회수된 토큰은 자유롭게 활용 가능'
//             ]
//         }
//     ];

//     return (
//         <div className="max-w-6xl mx-auto p-8 bg-gray-50">
//             <div className="flex justify-between items-start mb-8">
//                 <div>
//                     <h1 className="text-2xl font-bold mb-2">투자 프로세스 A to Z</h1>
//                     <h2 className="text-lg mb-1">안전하고 투명한 블록체인 투자 프로세스</h2>
//                     <p className="text-gray-600">투자의 모든 과정을 5단계로 쉽게 알아보세요!</p>
//                 </div>
//                 <div className="flex space-x-2">
//                     <button
//                         onClick={handlePrevStep}
//                         className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors
//               ${activeStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}`}
//                         disabled={activeStep === 1}
//                     >
//                         &lt;
//                     </button>
//                     <button
//                         onClick={handleNextStep}
//                         className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors
//               ${activeStep === 5 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'}`}
//                         disabled={activeStep === 5}
//                     >
//                         &gt;
//                     </button>
//                 </div>
//             </div>

//             <div className="flex">
//                 {/* Left Navigation */}
//                 <div className="w-1/3 pr-6">
//                     {steps.map((step, index) => (
//                         <div key={step.number} className="relative">
//                             <div
//                                 onClick={() => setActiveStep(step.number)}
//                                 className={`flex items-start mb-12 cursor-pointer ${step.number === activeStep ? '' : 'opacity-50'
//                                     }`}
//                             >
//                                 <div className="mr-3">
//                                     <div className={`
//                     w-8 h-8 rounded-full flex items-center justify-center
//                     ${step.number === activeStep ? 'bg-purple-500 text-white' : 'bg-gray-200'}
//                   `}>
//                                         {step.number}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="text-sm text-gray-500">STEP {step.number}</div>
//                                     <div className="font-medium">{step.title}</div>
//                                 </div>
//                                 {index < steps.length - 1 && (
//                                     <div className="absolute left-4 top-8 w-px h-12 bg-gray-200" />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Right Content */}
//                 <div className="w-2/3">
//                     <div className="bg-white rounded-lg p-6 shadow-sm">
//                         <div className="inline-block px-3 py-1 bg-purple-50 text-purple-500 rounded mb-4">
//                         {steps[activeStep]?.map((step, index) => (
//         
//                         const Card = ({title, icon, description}) => (
//                         <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
//                             <div className="text-purple-500 mb-3">
//                                 {React.cloneElement(icon, { className: "w-12 h-12" })}
//                             </div>
//                             <h3 className="font-bold mb-2 text-center">{title}</h3>
//                             <p className="text-sm text-gray-600 text-center">{description}</p>
//                         </div>
//                         );
//                         {/* {activeStep === 1 && (
//                             <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                                 <div className="flex justify-around items-center">
//                                     <div className="flex flex-col items-center">
//                                         <UserCircle className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">회원가입</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <Wallet className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">지갑 생성</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <CheckCircle className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">완료</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                         {activeStep === 2 && (
//                             <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                                 <div className="flex justify-around items-center">
//                                     <div className="flex flex-col items-center">
//                                         <CreditCard className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">구매 신청</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <Coins className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">토큰 발행</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <Wallet className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">지갑 전송</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {activeStep === 3 && (
//                             <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                                 <div className="flex justify-around items-center">
//                                     <div className="flex flex-col items-center">
//                                         <Search className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">투자처 선택</span>
//                                     </div>

//                                     <div className="absolute top-1/2 right-0 animate-slide-right">
//                                         <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-around items-center">
//                                     <div className="flex flex-col items-center">
//                                         <Key className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">인증</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>



//                                     <div className="flex flex-col items-center">
//                                         <FileText className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">계약서 확인</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <PenTool className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">전자서명</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <CheckCircle className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">투자 완료</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {activeStep === 4 && (
//                             <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                                 <div className="grid grid-cols-2 gap-6">
//                                     <div className="flex flex-col items-center p-6 bg-white rounded-lg">
//                                         <LineChart className="w-12 h-12 text-purple-500 mb-3" />
//                                         <h3 className="font-bold mb-2">실시간 모니터링</h3>
//                                         <p className="text-sm text-gray-600 text-center">
//                                             목표 달성률과 투자 진행 상황을
//                                             실시간으로 확인하세요
//                                         </p>
//                                     </div>

//                                     <div className="flex flex-col items-center p-6 bg-white rounded-lg">
//                                         <FileCheck className="w-12 h-12 text-purple-500 mb-3" />
//                                         <h3 className="font-bold mb-2">자동 계약 체결</h3>
//                                         <p className="text-sm text-gray-600 text-center">
//                                             목표 금액 달성 시 스마트 컨트랙트로
//                                             자동 계약이 체결됩니다
//                                         </p>
//                                     </div>

//                                     <div className="flex flex-col items-center p-6 bg-white rounded-lg">
//                                         <Lock className="w-12 h-12 text-purple-500 mb-3" />
//                                         <h3 className="font-bold mb-2">블록체인 기록</h3>
//                                         <p className="text-sm text-gray-600 text-center">
//                                             모든 투자 내역이 블록체인에
//                                             안전하게 기록됩니다
//                                         </p>
//                                     </div>

//                                     <div className="flex flex-col items-center p-6 bg-white rounded-lg">
//                                         <History className="w-12 h-12 text-purple-500 mb-3" />
//                                         <h3 className="font-bold mb-2">투자 이력 관리</h3>
//                                         <p className="text-sm text-gray-600 text-center">
//                                             내가 투자한 모든 프로젝트의
//                                             이력을 관리할 수 있습니다
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}


//                         {activeStep === 5 && (
//                             <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                                 <div className="flex justify-around items-center">
//                                     <div className="flex flex-col items-center">
//                                         <Timer className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">계약 만료</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <Wallet className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">자동 입금</span>
//                                     </div>

//                                     <div className="h-px w-16 bg-purple-300 relative">
//                                         <div className="absolute top-1/2 right-0 animate-slide-right">
//                                             <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <Repeat className="w-12 h-12 text-purple-500 mb-2" />
//                                         <span className="text-sm text-gray-600">재투자/현금화</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )} */
//                         }
//                         <div className="space-y-4">
//                             {steps[activeStep - 1].points.map((point, index) => (
//                                 <div key={index} className="flex items-start space-x-2">
//                                     <div className="text-purple-500 mt-1">✓</div>
//                                     <p>{point}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InvestmentProcess;


import React, { useState } from 'react';
import { UserCircle, Wallet, Shield, CheckCircle, CreditCard, Coins, LineChart, FileCheck, Lock, History, Timer, Repeat, Search, Key, FileText, PenTool } from 'lucide-react';

const Card = ({ title, secondLine, icon, description }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
        <div className="text-purple-500 mb-2">
            {React.cloneElement(icon, { className: "w-10 h-10" })}
        </div>
        <h3 className="font-bold text-center leading-normal">{title}</h3>
        <h3 className="font-bold text-center leading-normal mb-1">{secondLine}</h3>
        <p className="text-xs text-gray-600 text-center">{description}</p>
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
            points: [
                '안전한 블록체인 지갑이 자동으로 생성됩니다',
                '복잡한 설정 없이 바로 시작할 수 있습니다',
                '은행 계좌처럼 쉽고 안전한 디지털 자산 관리가 가능합니다'
            ]
        },
        {
            number: 2,
            title: '토큰 구매',
            subtitle: '투자를 위한 토큰을 구매하세요',
            points: ['1 PKC = 100원입니다.', '구매한 토큰은 즉시 지갑에 반영됩니다.']
        },
        {
            number: 3,
            title: '스타트업 투자',
            subtitle: '원하는 스타트업에 토큰으로 투자하세요',
            points: [
                '원하는 스타트업을 찾아보세요',
                '지갑 비밀번호로 안전한 투자 진행됩니다.',
                '원하는 만큼의 분산투자가 가능합니다.',
            ]
        },
        {
            number: 4,
            title: '계약 체결',
            subtitle: '목표 달성 시 자동 계약 체결',
            points: [
                '실시간 투자 모금 진행률 모니터링이 가능합니다.',
                '목표 금액 달성 시 자동 계약 체결됩니다.',
                '블록체인에 영구 기록됩니다.',
                '투자 내역에 들어가시면 조회 가능합니다. '
            ]
        },
        {
            number: 5,
            title: '투자금 회수',
            subtitle: '계약 기간 종료 후 자동으로 투자금이 회수됩니다',
            points: [
                '약속된 계약 기간 만료 시 계약이 종료됩니다.',
                '수익이 발생할 시 자동으로 지갑에 입금됩니다.',

            ]
        }
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
                        className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors ${activeStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
                            }`}
                        disabled={activeStep === 1}
                    >
                        &lt;
                    </button>
                    <button
                        onClick={handleNextStep}
                        className={`p-2 rounded-lg border hover:bg-gray-100 transition-colors ${activeStep === 5 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
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
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            <div
                                onClick={() => setActiveStep(step.number)}
                                className={`flex items-start mb-12 cursor-pointer ${step.number === activeStep ? '' : 'opacity-50'
                                    }`}
                            >
                                <div className="mr-3">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${step.number === activeStep ? 'bg-purple-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
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

                {/* Right Content */}
                <div className="w-2/3">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="inline-block px-3 py-1 bg-purple-50 text-purple-500 rounded mb-4">
                            {activeStep}. {steps[activeStep - 1].title}
                        </div>
                        <h3 className="text-xl font-bold mb-6">{steps[activeStep - 1].subtitle}</h3>
                        <div className="mb-6 p-4 rounded-lg bg-gray-50">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {activeStep === 1 && (
                                    <>
                                        <Card title="간편 회원가입" icon={<UserCircle />} description="빠르고 쉬운 회원가입으로 시작하세요" />
                                        <Card title="자동 지갑생성" icon={<Wallet />} description="회원가입과 동시에 블록체인 지갑 생성" />
                                        <Card title="보안 인증" icon={<Shield />} description="안전한 보안 시스템으로 자산 보호" />
                                        <Card title="투자 준비" icon={<CheckCircle />} description="즉시 투자 가능한 상태 완료" />
                                    </>
                                )}
                                {activeStep === 2 && (
                                    <>
                                        <Card title="토큰 구매" icon={<CreditCard />} description="원하는 만큼 투자 토큰 구매" />
                                        <Card title="즉시 지급" icon={<Coins />} description="구매 즉시 지갑으로 토큰 지급" />
                                        <Card title="잔액 확인" icon={<Wallet />} description="실시간 토큰 잔액 확인" />
                                        <Card title="구매 완료" icon={<CheckCircle />} description="투자를 위한 준비 완료" />
                                    </>
                                )}
                                {activeStep === 3 && (
                                    <>
                                        <Card title="투자처 선택" icon={<Search />} description="원하는 스타트업 프로젝트 선택" />
                                        <Card title="지갑 인증" icon={<Key />} description="안전한 투자를 위한 지갑 인증" />
                                        <Card title="계약서 확인" icon={<FileText />} description="투자 계약서 내용 확인" />
                                        <Card title="투자 완료" icon={<CheckCircle />} description="투자 프로세스 완료" />
                                    </>
                                )}
                                {activeStep === 4 && (
                                    <>
                                        <Card
                                            title="실시간"
                                            secondLine="모니터링"
                                            icon={<LineChart />}
                                            description="목표 달성률과 투자 진행 현황 확인"
                                        />
                                        <Card title="자동 계약 체결" icon={<FileCheck />} description="목표액 달성시 자동 체결" />
                                        <Card title="블록체인 기록" icon={<Lock />} description="블록체인에 영구 기록" />
                                        <Card title="투자 이력 관리" icon={<History />} description="투자 기록 실시간 확인" />
                                    </>
                                )}

                                {activeStep === 5 && (
                                    <>
                                        <Card title="계약 만료 확인" icon={<Timer />} description="약속된 계약 기간 종료" />
                                        <Card title="수익금 입금" icon={<Wallet />} description="투자금과 수익을 지갑으로 입금" />
                                        <Card title="자유로운 활용" icon={<Repeat />} description="재투자 또는 현금화 선택" />
                                        <Card title="이력 관리" icon={<History />} description="완료된 투자 기록 관리" />
                                    </>
                                )}
                            </div>
                        </div>
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

export default InvestmentProcess;
