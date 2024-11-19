import React from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const NftCard = ({
  startupId,
  name,
  category,
  investmentStartDate,
  investmentTargetDeadline,
  fundingProgress,
  currentCoin,
  goalCoin,
  image,
}) => {
  const navigate = useNavigate();

  // 상세 페이지로 이동하는 핸들러
  const handleCardClick = (e) => {
    if (!e.target.closest('.invest-button')) {
      navigate(`/main/default/details/${startupId}`);
    }
  };

  // 투자하기 페이지로 이동
  const handleInvestClick = (e) => {
    e.stopPropagation();
    navigate(`/invest/${startupId}`);
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Card
      onClick={handleCardClick}
      className="flex flex-col w-full h-full p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      style={{ cursor: "pointer" }}
    >
      {/* 이미지 섹션 */}
      <div className="relative mb-4">
        <img
          src={image}
          className="w-full h-64 object-contain rounded-lg"
          alt={name}
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="px-2 space-y-3">
        {/* 날짜 표시 */}
        <div className="text-xs text-gray-500">
          {formatDate(investmentStartDate)} - {formatDate(investmentTargetDeadline)}
        </div>

        {/* 이름과 설명 */}
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold text-navy-700">{name}</h4>
        </div>

        {/* 진행률 바 */}
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${fundingProgress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(fundingProgress)}%
          </span>
        </div>

        {/* 금액 정보 */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-500">
            {currentCoin.toLocaleString()} / {goalCoin.toLocaleString()} PCK
          </p>
        </div>

        {/* 투자하기 버튼 */}
        <div className="pt-2">
          <button
            onClick={handleInvestClick}
            className="invest-button w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200 
                     flex items-center justify-center gap-2"
          >
            투자하기
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;