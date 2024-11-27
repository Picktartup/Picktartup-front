import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "assets/img/nfts/default.png";
import Navbar from "components/navbar";
import SSIIndicator from "components/ssi/SSIIndicator";
import CompanyOverview from "components/CompanyOverview";


const DetailPage = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState(null);
  const [articles, setArticles] = useState([]);
  const [ssiData, setSsiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const [logoUrl, setLogoUrl] = useState(null);  // 로고 URL을 위한 state 추가


  // 총 페이지 수 계산
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // 현재 페이지에 표시할 기사 데이터
  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // 스타트업 상세 데이터 가져오기
  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        const [startupResponse, logoResponse] = await Promise.all([
          axios.get(`/api/v1/startups/${startupId}?source=jpa`),
          axios.get('/api/v1/startups/logo-urls')
        ]);
        setStartup(startupResponse.data.data);

        // 로고 URL 찾기
        const startupLogo = logoResponse.data.find(
          item => item.startupId === parseInt(startupId)
        );
        setLogoUrl(startupLogo?.logoUrl || defaultImage);

        const latestSsi = startupResponse.data.data.ssiList
          .sort((a, b) => new Date(b.evalDate) - new Date(a.evalDate))[0];

        const formattedSsiData = {
          people_grade: latestSsi.peopleGrade,
          product_grade: latestSsi.productGrade,
          performance_grade: latestSsi.performanceGrade,
          potential_grade: latestSsi.potentialGrade,
          eval_date: latestSsi.evalDate,
          eval_description: latestSsi.evalDescription,
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
        const response = await axios.get(
          `/api/v1/articles/startup/${startup.startupId}`
        );
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
      }
    };

    if (startup) {
      fetchArticles();
    }
  }, [startup]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    const navbarHeight = 96;
    if (section) {
      const targetPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;


  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <Navbar />

      {/* 상단 바 */}
      <div className="sticky top-16 z-40 bg-white/10 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 및 기업명 */}
            <div className="flex items-center space-x-4">
              <img
                src={logoUrl}
                alt={`${startup.name} 로고`}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />
              <span className="font-semibold text-navy-700">{startup.name}</span>

              {/* 네비게이션 버튼 */}
              <nav className="flex items-center space-x-6 ml-8">
                {["dashboard", "ssi", "articles"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-sm font-medium ${
                      activeSection === section
                        ? "text-navy-700 font-bold"
                        : "text-gray-500"
                    } hover:text-navy-700`}
                  >
                    {section === "dashboard"
                      ? "대시보드"
                      : section === "ssi"
                      ? "SSI"
                      : "최근 기사"}
                  </button>
                ))}
              </nav>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg shadow-sm hover:bg-blue-700">
              투자하기
            </button>
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="container mx-auto px-4 pt-8">
        <div className="space-y-8">
          {/* 대시보드 섹션 */}
          <section id="dashboard" className="bg-white p-6 rounded-lg shadow-md">
            <CompanyOverview
              description={startup.description}
              investmentStatus={startup.investmentStatus}
              investmentRound={startup.investmentRound}
              ceoName={startup.ceoName}
              address={startup.address}
              page={startup.page}
              establishmentDate={startup.establishmentDate}
            />
          </section>

          {/* SSI 섹션 */}
          <section id="ssi" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">SSI 분석</h2>
            {ssiData && <SSIIndicator ssiData={ssiData} />}
          </section>

          {/* 기사 섹션 */}
          <section id="articles" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">최근 기사</h2>
            {articles.length === 0 ? (
              <p className="text-gray-600">관련 기사가 없습니다.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="border rounded-lg shadow-sm p-4 bg-gray-50"
                    >
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={article.imageUrl || defaultImage}
                          alt={article.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                          {article.title}
                        </h3>
                      </a>
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center items-center mt-8 gap-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 
                      focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    이전
                  </button>
                  <span className="font-bold text-sm text-gray-700">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 
                      disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 
                      focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  >
                    다음
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
