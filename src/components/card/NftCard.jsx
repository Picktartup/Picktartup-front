import React, { useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import InvestmentModal from "components/modal/InvestmentModal";
import defaultImage from 'assets/img/nfts/default.png';

const NftCard = ({
  startupId,
  name,
  category,
  industryType,
  industry_type,
  investmentStartDate,
  investmentTargetDeadline,
  fundingProgress,
  currentCoin,
  goalCoin,
  image,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 투자 모달 상태
  const [imageError, setImageError] = useState(false);

  // 상세 페이지로 이동하는 핸들러
  const handleCardClick = (e) => {
    if (!e.target.closest('.invest-button')) {
      navigate(`/main/default/details/${startupId}`);
    }
  };

  // 투자하기 버튼 클릭 핸들러
  const handleInvestClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true); // 모달 열기
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const displayIndustryType = industry_type || industryType;

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
      >
        {/* 이미지 섹션 */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white p-6">
          <div className="w-full aspect-square flex items-center justify-center bg-gray-50/50 rounded-lg p-4">
            <img
              src={image}
              alt={`${name} 로고`}
              onError={(e) => {
                setImageError(true);
                e.target.src = defaultImage;
              }}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="p-4 flex flex-col gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              <span className="px-2.5 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                {category}
              </span>
            </div>
            {displayIndustryType && (
              <p className="text-sm font-medium text-gray-700">"{displayIndustryType}"</p>
            )}
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-semibold">투자기간: </span>
            {formatDate(investmentStartDate).slice(2)} - {formatDate(investmentTargetDeadline).slice(2)}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">투자 진행률</span>
              <span className="text-base font-bold text-blue-700">{Math.round(fundingProgress)}%</span>
            </div>

            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="absolute h-full bg-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${fundingProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-baseline text-sm">
              <div>
                <span className="font-medium text-gray-700 mr-2">현재</span>
                <span className="font-bold text-gray-900">{currentCoin.toLocaleString()}</span>
                <span className="font-medium text-gray-700 ml-1">PCK</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 mr-2">목표</span>
                <span className="font-bold text-gray-800">{goalCoin.toLocaleString()}</span>
                <span className="font-medium text-gray-700 ml-1">PCK</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleInvestClick}
            className="invest-button mt-2 w-full py-3 bg-violet-600 
                     text-white rounded-xl font-semibold hover:bg-violet-700 
                     transform hover:-translate-y-0.5 transition-all duration-200 
                     flex items-center justify-center gap-2"
          >
            투자하기
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* InvestmentModal 모달 */}
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        campaignId={process.env.REACT_APP_MOCK_STARTUP_ID} // 캠페인 ID 전달
      />
    </>
  );
};

export default NftCard;
