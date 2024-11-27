import React from "react";

const InvestmentInfo = ({ investmentData }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">투자 정보</h2>
      <div className="grid grid-cols-2 gap-4"> {/* 두 개의 열로 구성 */}
        {/* 왼편 - 두 개의 row */}
        <div className="grid grid-rows-2 gap-4">
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 font-bold">투자 토큰</div>
            <div className="text-lg font-semibold text-gray-800">
              {investmentData.investToken.toLocaleString()} PCK
            </div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1 font-bold">반환 토큰</div>
            <div className="text-lg font-semibold text-gray-800">
              {investmentData.returnToken !== null
              ? `${investmentData.returnToken} PCK`
              : "미정"}
            </div>
          </div>
        </div>
        {/* 오른편 - 수익률 */}
        <div className="text-center bg-violet-50 rounded-lg p-6 flex flex-col justify-center">
          <div className="text-sm text-violet-600 mb-1 font-bold">수익률</div>
          <div className="text-2xl font-bold text-violet-700">
             {investmentData.roi !== null
              ? `${investmentData.roi}%`
              : `${investmentData.expectedRoi}% 예상`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfo;
