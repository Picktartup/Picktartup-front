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
      <div className="sticky top-16 z-40 w-full bg-white shadow-md py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* 왼쪽: 로고 및 스타트업 이름 */}
          <div className="flex items-center space-x-4">
            <img
              src={logoSrc}
              alt={`${startup.name} 로고`}
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-navy-700">{startup.name}</h1>
          </div>

          {/* 가운데: 탭 네비게이션 */}
          <div className="flex space-x-6">
            <a href="#company-info" className="text-lg font-semibold text-gray-700 hover:text-navy-700">
              대시보드
            </a>
            <a href="#ssi-info" className="text-lg font-semibold text-gray-700 hover:text-navy-700">
              SSI
            </a>
            <a href="#recent-articles" className="text-lg font-semibold text-gray-700 hover:text-navy-700">
              최근 기사
            </a>
          </div>

          {/* 오른쪽: 투자하기 버튼 */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
            투자하기
          </button>
        </div>
      </div>

      {/* 상세 내용 */}
      <div className="container mx-auto px-4 mt-6">
        {/* 대시보드 섹션 */}
        <section id="company-info" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">기업 개요</h2>
          <p className="text-gray-600">{startup.description}</p>
        </section>

        {/* SSI 평가 정보 섹션 */}
        <section id="ssi-info" className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">SSI 분석</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SSIIndicator title="People" description="팀의 역량, 인적 자원, 관리 능력 등을 평가합니다." />
            <SSIIndicator title="Product" description="제품의 품질, 시장성, 기술력 등을 평가합니다." />
            <SSIIndicator title="Performance" description="과거 성과, 매출 성장률 및 시장 입지를 평가합니다." />
            <SSIIndicator title="Potential" description="미래 성장 가능성, 혁신성, 시장 기회 등을 평가합니다." />
          </div>
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
