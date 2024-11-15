import React from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "./components/Progressbar";
import Banner from "./components/Banner";

const ContractDetail = () => {
  const { id } = useParams();

  const investmentData = {
    id,
    contractStatus: "ACTIVE",
    startupName: "레브잇",
    startupLogo: "/api/placeholder/100/100",
    investAt: "2023-10-11",
    contractBeginAt: "2023-11-01",
    contractEndAt: null,
    investToken: 500,
    returnToken: null,
    process: 60,
    roi: null,
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* 헤더 섹션 */}
      <Banner />

      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img src={investmentData.startupLogo} alt={investmentData.startupName} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{investmentData.startupName}</h1>
          <span
            className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${
              investmentData.contractStatus === "ACTIVE" ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {investmentData.contractStatus === "ACTIVE" ? "진행 중" : "완료"}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">투자 진행 현황</h2>
        <ProgressBar investmentData={investmentData} />
      </div>

      {/* 투자 및 수익 정보 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 투자 정보 카드 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            투자 정보
          </h2>
          <div>
            <div className="text-sm text-gray-500">투자 토큰</div>
            <div className="text-lg font-semibold text-gray-800">{investmentData.investToken.toLocaleString()} 개</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">반환 토큰</div>
            <div className="text-lg font-semibold text-gray-800">
              {investmentData.returnToken?.toLocaleString() ?? "미정"} 개
            </div>
          </div>
        </div>

        {/* 수익 정보 카드 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            수익 정보
          </h2>
          <div>
            <div className="text-sm text-gray-500">진행률</div>
            <div className="text-lg font-semibold text-gray-800">{investmentData.process}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">수익률</div>
            <div className="text-lg font-semibold text-gray-800">{investmentData.roi ?? "미정"}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
