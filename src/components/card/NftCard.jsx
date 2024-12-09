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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = (e) => {
    if (!e.target.closest('.invest-button')) {
      navigate(`/main/default/details/${startupId}`);
    }
  };

  const handleInvestClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const displayIndustryType = industry_type || industryType;

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full"
      >
        {/* 이미지 섹션 - 정사각형 비율 */}
        <div className="w-full aspect-[4/3] relative bg-white">
          <img
            src={!imageError ? image : defaultImage}
            alt={`${name} 로고`}
            onError={(e) => {
              setImageError(true);
              e.target.src = defaultImage;
            }}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="p-4 flex flex-col gap-2 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 line-clamp-1">{name}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 whitespace-nowrap">
                {category}
              </span>
            </div>
            {displayIndustryType && (
              <p className="text-sm font-medium text-gray-600 truncate">
                "{displayIndustryType}"
              </p>
            )}
          </div>

          <div className="text-xs text-gray-600">
            <span className="font-semibold">투자기간: </span>
            {formatDate(investmentStartDate).slice(2)} - {formatDate(investmentTargetDeadline).slice(2)}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">투자 진행률</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(fundingProgress)}%</span>
            </div>

            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="absolute h-full bg-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${fundingProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-baseline text-xs">
              <div>
                <span className="font-medium text-gray-500">현재</span>
                <span className="font-bold text-gray-900 ml-1">{currentCoin.toLocaleString()}</span>
                <span className="font-medium text-gray-500 ml-0.5">PCK</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">목표</span>
                <span className="font-bold text-gray-800 ml-1">{goalCoin.toLocaleString()}</span>
                <span className="font-medium text-gray-500 ml-0.5">PCK</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleInvestClick}
            className="invest-button mt-1 w-full py-2 bg-violet-600 
                     text-white text-sm rounded-xl font-semibold hover:bg-violet-700 
                     transform hover:-translate-y-0.5 transition-all duration-200 
                     flex items-center justify-center gap-1.5"
          >
            투자하기
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>

      <InvestmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        campaignId={process.env.REACT_APP_MOCK_STARTUP_ID}
      />
    </>
  );
};

export default NftCard;