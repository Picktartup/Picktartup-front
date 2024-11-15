// src/views/main/Marketplace.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from 'components/HeroSection';
import NftCard from 'components/card/NftCard';
import defaultImage from 'assets/img/nfts/default.png';
import { useNavigate } from 'react-router-dom';

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

const Marketplace = () => {
  const [startups, setStartups] = useState([]);
  const navigate = useNavigate();

  const fetchStartups = async () => {
    try {

      const response = await axios.get('/api/v1/startups/top',{
        params: {source: 'jpa'}
      });
      console.log("Fetched startups:", response.data.data); // 데이터 구조 확인
      setStartups(response.data.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
      alert("Failed to fetch startups data"); // 실패 시 알림
    }
  };

  const handleCardClick = (startupId) => {
    console.log("Clicked startupId:", startupId); // ID가 제대로 넘어오는지 확인
    if (startupId) {
      navigate(`/main/default/details/${startupId}`);
    } else {
      console.error("startupId is undefined.");
    }
  };

  useEffect(() => {
    console.log("useEffect is called");
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
          {startups.map((startup) => {
            console.log("startup.id:", startup.id); // 각 startup 객체의 id 확인
            return (
              <NftCard
                key={startup.startupId} // 고유한 key 설정
                startupId={startup.startupId}
                name={startup.name}
                category={startup.category}
                contractStartDate={startup.contractStartDate}
                contractTargetDeadline={startup.contractTargetDeadline}
                progress={startup.progress}
                currentCoin={startup.currentCoin}
                goalCoin={startup.goalCoin}
                fundingProgress={startup.fundingProgress}
                image={getImageByName(startup.name)}
                onClick={() => handleCardClick(startup.startupId)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
