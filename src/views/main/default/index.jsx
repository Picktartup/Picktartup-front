// src/views/main/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from 'components/HeroSection';
import NftCard from 'components/card/NftCard';
import defaultImage from 'assets/img/nfts/default.png';

// 모든 이미지를 객체로 미리 가져오기
const importAllImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((key) => {
    const imageName = key.replace('./', '').replace('.png', '');
    images[imageName] = requireContext(key);
  });
  return images;
};

// 모든 png 파일을 가져와 `nftImages` 객체 생성
const nftImages = importAllImages(require.context("assets/img/nfts", false, /\.png$/));

// 이름에 따라 이미지를 반환하는 함수
const getImageByName = (name) => nftImages[name] || defaultImage;

const Marketplace = () => {
  const [startups, setStartups] = useState([]);

  // fetchStartups 함수 정의
  const fetchStartups = async () => {
    try {
      const response = await axios.get('http://localhost:8999/api/v1/startups/top');
      setStartups(response.data.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 API 호출
  useEffect(() => {
    fetchStartups();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* 제목 */}
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-6">
           Trending Startup
        </h2>

        {/* 스타트업 리스트 */}
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
    </div>
  );
};

export default Marketplace;
