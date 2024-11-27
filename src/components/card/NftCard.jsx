import React, { useState } from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
import defaultImage from 'assets/img/nfts/default.png';

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
  const [imageError, setImageError] = useState(false);  // 이미지 에러 상태 추가

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
      className="relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* 이미지 섹션 */}
      <div className="relative  bg-gradient-to-b from-gray-50 to-white p-8 flex items-center justify-center">
        <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-50/50 rounded-lg p-6">
          <img
            src={image}
            alt={`${name} 로고`}
            onError={(e) => {
              console.log('Image load error for:', name, image);
              setImageError(true);
              e.target.src = defaultImage;
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover 
                  transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>

      {/* 콘텐츠 섹션 */}
      <div className="p-4 space-y-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
            <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
              {category}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">투자 기간</div>
            <div className="text-sm font-medium text-gray-700 mt-1">
              {formatDate(investmentStartDate).slice(2)} - {formatDate(investmentTargetDeadline).slice(2)}
            </div>
          </div>
        </div>

        {/* 투자 현황 */}
        <div className="space-y-3 pt-2">
          {/* 진행률 표시 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">투자 진행률</span>
            <span className="text-lg font-bold text-blue-600">{Math.round(fundingProgress)}%</span>
          </div>

          {/* 프로그레스 바 */}
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${fundingProgress}%` }}
            />
          </div>

          {/* 투자 금액 */}
          <div className="flex justify-between items-baseline pt-1">
            <div>
              <div className="text-xs text-gray-500 mb-1">현재 투자</div>
              <div className="text-base font-bold text-gray-900">
                {currentCoin.toLocaleString()} <span className="text-sm font-medium text-gray-500">PCK</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">목표 금액</div>
              <div className="text-base font-medium text-gray-700">
                {goalCoin.toLocaleString()} <span className="text-sm font-normal text-gray-500">PCK</span>
              </div>
            </div>
          </div>
        </div>

        {/* 투자하기 버튼 */}
        <button
          onClick={handleInvestClick}
          className="invest-button w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                   text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 
                   transform hover:-translate-y-0.5 transition-all duration-200 
                   flex items-center justify-center gap-2 shadow-md"
        >
          투자하기
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card >
  );
};

// 날짜 포맷팅 함수 개선
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

export default NftCard;