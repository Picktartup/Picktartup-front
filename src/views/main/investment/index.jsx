import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard from "components/card/NftCard";
import defaultImage from "assets/img/nfts/default.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StartupInvestment = () => {
  const [startups, setStartups] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지에 표시할 스타트업 수
  const [logoUrls, setLogoUrls] = useState({});


  const fetchStartups = async () => {
    try {
      const [startupResponse, logoResponse] = await Promise.all([
        axios.get(`https://picktartup.com/api/v1/startups`, {
          params: { keyword: keyword, source: "elk" },
        }),
        axios.get('https://picktartup.com/api/v1/startups/logo-urls')
      ]);

      setStartups(startupResponse.data.data);

      // 로고 URL 매핑
      const urlMap = logoResponse.data.reduce((acc, startup) => {
        acc[startup.startupId] = startup.logoUrl;
        return acc;
      }, {});
      setLogoUrls(urlMap);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [keyword]);


  // 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = startups.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(startups.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      {/* 검색바와 타이틀 */}
      <div className="flex flex-col mb-8">
        <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4 self-start">
          Startup List
        </h2>

        <div className="flex w-full justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow p-3 max-w-2xl border border-gray-300 rounded-md mr-2"
          />
          <button
            onClick={fetchStartups}
            className="px-4 py-2 bg-violet-600 text-white rounded-md"
          >
            검색
          </button>
        </div>
      </div>

      {/* Startup List */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((startup) => {
          console.log('startup data:', startup);  // 데이터 확인
          return (
            <NftCard
              startupId={startup.startupId}
              key={startup.startupId}
              name={startup.name}
              category={startup.category}
              investmentStartDate={startup.investmentStartDate}
              investmentTargetDeadline={startup.investmentTargetDeadline}
              progress={startup.progress}
              currentCoin={startup.currentCoin}
              goalCoin={startup.goalCoin}
              fundingProgress={startup.fundingProgress}
              image={logoUrls[startup.startupId] || defaultImage}
              industryType={startup.industryType}
            />
          );
        })}
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
          <FaChevronLeft size={16} />
        </button>
        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default StartupInvestment;
