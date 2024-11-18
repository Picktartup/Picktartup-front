import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "components/navbar";
import axios from "axios";
import defaultImage from "assets/img/nfts/default.png";
import SSIIndicator from "components/ssi/SSIIndicator";

const importAllImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((key) => {
    const imageName = key.replace("./", "").replace(".png", "");
    images[imageName] = requireContext(key);
  });
  return images;
};

const nftImages = importAllImages(
  require.context("assets/img/nfts", false, /\.png$/)
);
const getImageByName = (name) => nftImages[name] || defaultImage;

const DetailPage = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/startups/${startupId}`
        );
        setStartup(response.data.data);
      } catch (error) {
        console.error("Error fetching startup details:", error);
      }
    };
    fetchStartupDetails();
  }, [startupId]);

  if (!startup) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">로딩 중...</p>
      </div>
    );
  }

  const logoSrc = getImageByName(startup.name);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 첫 번째 상단바 */}
      <Navbar />

      {/* 두 번째 상단바 */}
      <div className="sticky top-16 z-40 w-full bg-white/10 backdrop-blur-xl shadow-md py-4">
        <div className="container mx-auto px-4">
          {/* 왼쪽: 로고 및 스타트업 이름 */}
          <div className="flex items-center space-x-4 mb-3">
            <img
              src={logoSrc}
              alt={`${startup.name} 로고`}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full" // 로고 크기 증가
            />
            <h1 className="text-xl font-bold text-navy-700">{startup.name}</h1>
          </div>

           {/* 네비게이션 링크를 스타트업 이름 아래에 왼쪽 정렬로 배치 */}
           <div className="flex space-x-6 mt-2 pl-16"> {/* 왼쪽 정렬을 위한 padding */}
            <a href="#company-info" className="text-lg font-semibold text-[#7885ad] hover:text-navy-700 dark:hover:text-white">
              대시보드
            </a>
            <a href="#ssi-info" className="text-lg font-semibold text-[#7885ad] hover:text-navy-700 dark:hover:text-white">
              SSI
            </a>
            <a href="#recent-articles" className="text-lg font-semibold text-[#7885ad] hover:text-navy-700 dark:hover:text-white">
              최근 기사
            </a>
          </div>

          {/* 오른쪽: 투자하기 버튼 */}
          <div className="flex justify-end mt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              투자하기
            </button>
            </div>
        </div>
      </div>

      {/* 상세 내용 */}
      <div className="container mx-auto px-4 mt-6">
        {/* 대시보드 섹션 */}
        <section id="company-info" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">기업 개요</h2>
          <p className="text-gray-600">{startup.description}</p>
          
          <div className="text-gray-600 mb-6">
            <p><strong>카테고리: </strong>{startup.category}</p>
          </div>

          {/* 주요 정보 */}
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">주요 정보</h3>
            <div className="flex items-center text-gray-600">
              <p className="mr-8"><strong>상태: </strong>{startup.investmentStatus}</p>
              <p><strong>투자 라운드: </strong>{startup.investmentRound}</p>
            </div>
          </div>
          
          
        
        </section>

        {/* SSI 평가 정보 섹션 */}
        <section id="ssi-info" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">SSI 분석</h2>
          <SSIIndicator />
        </section>

        {/* 최근 기사 섹션 */}
        <section id="recent-articles" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">최근 기사</h2>
          <p className="text-gray-600">여기에 최근 기사 목록을 추가할 수 있습니다.</p>
        </section>
      </div>
    </div>
  );
};

export default DetailPage;
