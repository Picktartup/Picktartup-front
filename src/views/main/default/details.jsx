import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "assets/img/nfts/default.png";
import Navbar from "components/navbar";
import SSIIndicator from "components/ssi/SSIIndicator";
import CompanyOverview from "components/CompanyOverview";

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
  const [articles, setArticles] = useState([]);
  const [ssiData, setSsiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 스타트업 상세 데이터와 SSI 데이터 가져오기
  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/startups/${startupId}?source=jpa`);
        setStartup(response.data.data);

        // ssiList 중 가장 최근 데이터 찾기
        const latestSsi = response.data.data.ssiList
          .sort((a, b) => new Date(b.evalDate) - new Date(a.evalDate))[0];

        // SSI 데이터 포맷팅
        const formattedSsiData = {
          people_grade: latestSsi.peopleGrade,
          product_grade: latestSsi.productGrade,
          performance_grade: latestSsi.performanceGrade,
          potential_grade: latestSsi.potentialGrade,
          eval_date: latestSsi.evalDate,
          eval_description: latestSsi.evalDescription
        };

        setSsiData(formattedSsiData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching startup details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [startupId]);

  // 관련 기사 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      if (!startup?.name) return;
      try {
        const response = await axios.get(`/api/v1/articles/${startup.name}`);
        setArticles(response.data.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      }
    };

    if (startup) {
      fetchArticles();
    }
  }, [startup]);

  // 스무스 스크롤 함수
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const navbarHeight = 96;
    if (section) {
      const targetPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  const logoSrc = getImageByName(startup.name);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 메인 네비게이션 바 */}
      <Navbar />

      {/* 서브 네비게이션 바 - 고정 위치 */}
      <div className="sticky top-16 z-40 bg-white/10 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 왼쪽: 로고 및 기업명 */}
            <div className="flex items-center space-x-4">
              <img
                src={logoSrc}
                alt={`${startup.name} 로고`}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold text-navy-700">{startup.name}</span>

              {/* 네비게이션 링크 */}
              <nav className="flex items-center space-x-6 ml-8">
                <button
                  onClick={() => scrollToSection('dashboard')}
                  className="text-sm font-medium text-gray-500 hover:text-navy-700"
                >
                  대시보드
                </button>
                <button
                  onClick={() => scrollToSection('ssi')}
                  className="text-sm font-medium text-gray-500 hover:text-navy-700"
                >
                  SSI
                </button>
                <button
                  onClick={() => scrollToSection('articles')}
                  className="text-sm font-medium text-gray-500 hover:text-navy-700"
                >
                  최근 기사
                </button>
              </nav>
            </div>

            {/* 오른쪽: 투자하기 버튼 */}
            <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow-sm hover:bg-blue-700">
              투자하기
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="container mx-auto px-4 pt-8">
        <div className="space-y-8">
          {/* 대시보드 섹션 */}
        
          <CompanyOverview
            description={startup.description}
            investmentStatus={startup.investmentStatus}
            investmentRound={startup.investmentRound}
            ceoName={startup.ceoName}
            address={startup.address}
            page={startup.page}
            establishmentDate={startup.establishmentDate}

          />

          {/* SSI 분석 섹션 */}
          <section id="ssi" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">SSI 분석</h2>
            {ssiData && <SSIIndicator ssiData={ssiData} />}
          </section>

          {/* 최근 기사 섹션 */}
          <section id="articles" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">최근 기사</h2>
            {articles.length === 0 ? (
              <p className="text-gray-600">관련 기사가 없습니다.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                  <div key={article.id} className="border rounded-lg shadow-sm p-4 bg-gray-50">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={article.imageUrl || defaultImage}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;