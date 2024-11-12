import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Card from "components/card";

const NftCard = ({
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

  return (
    <Card className="flex flex-col w-full h-full p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* 이미지 섹션 */}
      <div className="relative mb-4">
        <img
          src={image} // 이미지를 동적으로 로드
          className="w-full h-64 object-contain rounded-lg" // 이미지 크기 조정
          alt={name}
        />
        <button
          onClick={() => setHeart(!heart)}
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

        <div className="flex justify-end">
          <button className="px-4 py-2 text-sm bg-brand-900 text-white rounded-lg font-semibold hover:bg-brand-800 transition-colors duration-200">
            투자하기
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
