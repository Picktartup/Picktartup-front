// StartupProfile.js
import React from "react";

const StartupProfile = ({ investmentData, profileData }) => {
  const profileInfo = [
    { label: "기업 정보", value: profileData.desc },
    { label: "업종", value: profileData.category },
    { label: "SSI", value: profileData.ssi },
    { label: "상장 여부", value: profileData.investStatus },
    { label: "투자 라운드", value: profileData.investRound },
  ];

  return (
    <div className="bg-lightPrimary rounded-2xl px-4 py-8">
      <div className="flex flex-col items-center md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        {/* 왼쪽: 프로필 사진, 이름, 상태, 버튼 */}
        <div className="flex-shrink-0 flex flex-col items-center space-y-4 w-full md:w-64">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={profileData.logo} 
              alt={investmentData.startupName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800">{investmentData.startupName}</h1>
            <span
              className={`inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${
                investmentData.contractStatus === "BEGIN"
                  ? "bg-green-100 text-green-700"
                  : investmentData.contractStatus === "ACTIVE"
                  ? "bg-violet-100 text-violet-700"
                  : investmentData.contractStatus === "COMPLETED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {investmentData.contractStatus === "BEGIN"
                ? "모금 중"
                : investmentData.contractStatus === "ACTIVE"
                ? "진행 중"
                : investmentData.contractStatus === "COMPLETED"
                ? "완료됨"
                : "취소됨"}
            </span>
          </div>
          <a
            href="/invest"
            className="text-[14px] w-full md:w-auto text-violet-600 rounded-lg hover:text-violet-800 transition-colors text-center"
          >
            투자 상세 ↗
          </a>
        </div>

        {/* 오른쪽: 스타트업 정보 */}
        <div className="flex-grow">
          <div className="space-y-4">
            {profileInfo.map((info, index) => (
              <div key={index} className="flex flex-col md:items-center sm:flex-row sm:space-x-4">
                <span className="text-[14px] text-gray-600 min-w-[80px] font-bold">{info.label}</span>
                <span className="text-[16px] text-gray-900">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;