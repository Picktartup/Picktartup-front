import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Card from "components/card";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const NftCard = ({
  startupId,
  name,
  category,
  contractStartDate,
  contractTargetDeadline,
  fundingProgress,
  currentCoin,
  goalCoin,
  image,
}) => {
  const [heart, setHeart] = useState(true);
  const navigate = useNavigate(); // navigate 함수 생성

  // 상세 페이지로 이동하는 핸들러
  const handleCardClick = () => {
    navigate(`/main/default/details/${startupId}`); // 상세 페이지 경로로 이동
  };

  return (
    <Card
      onClick={handleCardClick} // Card 전체에 클릭 이벤트 추가
      className="flex flex-col w-full h-full p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{ cursor: "pointer" }} // 커서 포인터 스타일 추가
    >
      {/* 이미지 섹션 */}
      <div className="relative mb-4">
        <img
          src={image}
          className="w-full h-64 object-contain rounded-lg"
          alt={name}
        />
        <button
          onClick={(e) => {
            e.stopPropagation(); // 버튼 클릭 시 이벤트 전파 방지
            setHeart(!heart);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white text-brand-500 hover:bg-gray-100 shadow-sm transition-colors duration-200"
        >
          {heart ? <IoHeartOutline /> : <IoHeart className="text-red-500" />}
        </button>
      </div>

      <div className="px-2 space-y-2 relative">
        <div className="absolute top-0 right-0 text-xs text-gray-500">
          {new Date(contractStartDate).toLocaleDateString("ko-KR")} -{" "}
          {new Date(contractTargetDeadline).toLocaleDateString("ko-KR")}
        </div>

        <div className="flex flex-col items-start mb-2">
          <h4 className="text-lg font-semibold text-navy-700">{name}</h4>
          <p className="text-sm text-gray-500">{category}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${fundingProgress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(fundingProgress)}%
          </span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-medium text-gray-500">
            {currentCoin.toLocaleString()} / {goalCoin.toLocaleString()}
          </p>
        </div>

        {/* 투자하기 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={(e) => e.stopPropagation()} // 투자하기 버튼 클릭 시 이벤트 전파 방지
            className="px-4 py-2 text-sm bg-brand-900 text-white rounded-lg font-semibold hover:bg-brand-800 transition-colors duration-200"
          >
            투자하기
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
