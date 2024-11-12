import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NftCard from "components/card/NftCard";
import defaultImage from "assets/img/nfts/default.png";

// 모든 이미지를 동적으로 가져오기
const importAllImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((key) => {
    const imageName = key.replace('./', '').replace('.png', '');
    images[imageName] = requireContext(key);
  });
  return images;
};

const nftImages = importAllImages(require.context("assets/img/nfts", false, /\.png$/));

const getImageByName = (name) => nftImages[name] || defaultImage;

const StartupInvestment = () => {
  const [startups, setStartups] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchStartups();
  }, [keyword]);

  const fetchStartups = async () => {
    try {
      const response = await axios.get(`http://localhost:8999/api/v1/startups`, {
        params: { keyword: keyword }
      });
      setStartups(response.data.data);
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      {/* 검색바와 타이틀 */}
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4 self-start">
          스타트업 리스트
        </h2>

        <div className="flex w-full justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow p-3 max-w-2xl border border-gray-300 rounded-md mr-2"
          />
          <button onClick={fetchStartups} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            검색
          </button>
        </div>
      </div>

      {/* Startup List */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <NftCard
            key={startup.name}
            name={startup.name}
            category={startup.category}
            contractStartDate={startup.contractStartDate}
            contractTargetDeadline={startup.contractTargetDeadline}
            progress={startup.progress}
            currentCoin={startup.currentCoin}
            goalCoin={startup.goalCoin}
            fundingProgress={startup.fundingProgress}
            image={getImageByName(startup.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default StartupInvestment;
