import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "assets/img/nfts/default.png";
import Navbar from "components/navbar";
import SSIIndicator from "./components/SSI";
import CompanyOverview from "components/CompanyOverview";
import AnnualFinancialMetrics from "./components/AnnualMetrics";
import MonthlyMetrics from "./components/MonthlyMetrics";
import InvestmentRound from "./components/InvestmentRound";
import InvestmentModal from "components/modal/InvestmentModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DetailPage = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState(null);
  const [annualData, setAnnualData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [ssiData, setSsiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const articlesPerPage = 3;
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const sections = [
    { id: "dashboard", label: "대시보드" },
    { id: "investment-round", label: "투자 라운드" },
    { id: "annual-metrics", label: "연간 재무 지표" },
    { id: "monthly-metrics", label: "월간 재무 지표" },
    { id: "ssi", label: "SSI" },
    { id: "articles", label: "최근 기사" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbarHeight = 80;

    if (element) {
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [startupResponse, logoResponse] = await Promise.all([
          axios.get(`https://picktartup.com/api/v1/startups/${startupId}?source=jpa`),
          axios.get("https://picktartup.com/api/v1/startups/logo-urls"),
        ]);

        const startupData = startupResponse.data.data;
        const startupLogo = logoResponse.data.find(
          (item) => item.startupId === parseInt(startupId)
        );

        setStartup({
          ...startupData,
          logoUrl: startupLogo?.logoUrl || defaultImage,
        });

        const latestSsi = startupData.ssiList.sort(
          (a, b) => new Date(b.evalDate) - new Date(a.evalDate)
        )[0];

        setSsiData({
          people_grade: latestSsi.peopleGrade,
          product_grade: latestSsi.productGrade,
          performance_grade: latestSsi.performanceGrade,
          potential_grade: latestSsi.potentialGrade,
          eval_date: latestSsi.evalDate,
          eval_description: latestSsi.evalDescription,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching startup details:", err);
        setError("스타트업 정보를 불러오지 못했습니다.");
        setLoading(false);
      }
    };

    fetchStartupDetails();
  }, [startupId]);

  useEffect(() => {
    const fetchAnnualMetrics = async () => {
      try {
        const response = await axios.get(
          `https://picktartup.com/api/v1/startups/${startupId}/metrics/annual`
        );
        if (response.data) {
          const formattedData = response.data.map((item) => ({
            year: item.year,
            annual_revenue: item.annualRevenue,
            operating_profit: item.operatingProfit,
            net_profit: item.netProfit,
            total_asset: item.totalAsset,
            data_source: item.dataSource,
          }));
          setAnnualData(formattedData);
        }
      } catch (err) {
        console.error("Error fetching annual data:", err);
        setError("연간 재무 데이터를 불러오지 못했습니다.");
      }
    };

    fetchAnnualMetrics();
  }, [startupId]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          `https://picktartup.com/api/v1/startups/${startupId}/metrics/monthly`
        );
        setMonthlyData(response.data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setError("월별 재무 데이터를 불러오지 못했습니다.");
      }
    };

    fetchMonthlyData();
  }, [startupId]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!startup?.name) return;
      try {
        const response = await axios.get(
          `https://picktartup.com/api/v1/articles/startup/${startup.startupId}`
        );
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("관련 기사를 불러오지 못했습니다.");
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

  if (loading) {
    return <p className="font-dm text-center mt-16">로딩 중...</p>;
  }

  if (error) {
    return <p className="font-dm text-center mt-16 text-red-600">{error}</p>;
  }

  if (!startup) {
    return <p className="font-dm text-center mt-16">스타트업 데이터를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 font-pretendard">
      <Navbar />
      <div className="sticky top-16 z-40 bg-white/10 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img
                src={startup.logoUrl}
                alt={`${startup.name} 로고`}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold text-gray-900">{startup.name}</span>
              <nav className="flex items-center space-x-6 ml-8">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? "text-gray-900 font-bold border-b-2 border-purple-500"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={openModal}
              className="bg-violet-600 text-white px-4 py-2 text-sm rounded-lg shadow-sm hover:bg-purple-700 font-bold"
            >
              투자하기
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        <section id="dashboard" className="bg-white p-6 rounded-lg shadow-md">
          <CompanyOverview
            description={startup.description}
            investmentStatus={startup.investmentStatus}
            ceoName={startup.ceoName}
            address={startup.address}
            page={startup.page}
            establishmentDate={startup.establishmentDate}
            annualData={annualData}
            category={startup.category}
          />
        </section>

        <section id="investment-round" className="bg-white p-6 rounded-lg shadow-md">
          <InvestmentRound startupId={startupId} />
        </section>

        <section id="annual-metrics" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">연간 재무 지표</h2>
          <AnnualFinancialMetrics data={annualData} />
        </section>

        <section id="monthly-metrics" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">월별 재무 지표</h2>
          <MonthlyMetrics data={monthlyData} />
        </section>

        <section id="ssi" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">SSI 분석</h2>
          {ssiData && < SSIIndicator ssiData={ssiData} />}
        </section>

        <section id="articles" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">최근 기사</h2>
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
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={article.imageUrl || defaultImage}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-bold text-gray-900">
                        {article.title}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
                >
                  <FaChevronLeft />
                </button>
                <span className="text-sm font-medium">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
                >
                  <FaChevronRight />
                </button>
              </div>
            </>
          )}
        </section>
      </div>

      <InvestmentModal
        isOpen={isModalOpen}
        onClose={closeModal}

        startupId={startupId} // 캠페인 ID 전달
      />
    </div>
  );
};

export default DetailPage;
