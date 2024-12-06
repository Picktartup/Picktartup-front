import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Filter, ArrowRight } from 'lucide-react';
import HeroSection from 'components/HeroSection';
import SimpleStats from 'components/SimpleStats';
import defaultImage from 'assets/img/nfts/default.png';
import { useNavigate } from 'react-router-dom';
import NftCard from 'components/card/NftCard';
import TokenInvestmentProcess from 'components/TokenInvestmentProcess';
import MainCarousel from 'components/MainCarousel';
import MainVideo from 'components/MainVideo';
import TokenInvestment from 'components/TokenInvestment';


const Marketplace = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [logoUrl, setLogUrl] = useState({}); // 로고 URL을 저장할 객체
  const navigate = useNavigate();
  const fetchStartups = async () => {
    try {
      setIsLoading(true);
      setError(null); // 이전 에러 초기화 
      // 두 API를 동시에 호출
      const [topResponse, logosResponse] = await Promise.all([
        axios.get('/api/v1/startups/top', {
          params: { source: 'jpa' }
        }),
        axios.get('/api/v1/startups/logo-urls')
      ]);

    console.log('로고 URL 응답:', logosResponse.data);
    console.log('Top 스타트업 응답:', topResponse.data);

    const logoUrlMap = logosResponse.data.reduce((acc, startup) => {
      if (startup.logoUrl) {
        // URL 전체를 분해해서 한글 부분만 인코딩
        const urlParts = startup.logoUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];  // 마지막 부분(파일명)
        urlParts[urlParts.length - 1] = encodeURIComponent(fileName);
        const encodedUrl = urlParts.join('/');
        
        console.log('Original URL:', startup.logoUrl);
        console.log('Encoded URL:', encodedUrl);
        
        acc[startup.startupId] = encodedUrl;
      }
      return acc;
    }, {});

    console.log('Logo URL Map:', logoUrlMap);

    const startupsWithLogos = topResponse.data.data.map(startup => ({
      ...startup,
      logoUrl: logoUrlMap[startup.startupId] || defaultImage
    }));


      setStartups(startupsWithLogos);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

      useEffect(() => {
        fetchStartups();
      }, []);

      return (
        <div className="w-full min-h-screen bg-gray-50">
          <MainVideo />
          {/* <MainCarousel />/ */}
          {/* <HeroSection /> */}
          <SimpleStats />
          {/* <TokenInvestment/> */}
          <TokenInvestmentProcess />

          <div className="container mx-auto px-4 py-16">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Trending Startup
                </h2>
              </div>
            </div>

            {/* Startup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-200" />
                    <div className="p-5 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-200 rounded w-full" />
                    </div>
                  </div>
                ))
              ) : (
                startups.map((startup) => (
                  <NftCard
                    key={startup.startupId}
                    startupId={startup.startupId}
                    name={startup.name}
                    category={startup.category}
                    industry_type={startup.industry_type}
                    investmentStartDate={startup.investmentStartDate}
                    investmentTargetDeadline={startup.investmentTargetDeadline}
                    fundingProgress={startup.fundingProgress}
                    currentCoin={startup.currentCoin}
                    goalCoin={startup.goalCoin}
                    image={startup.logoUrl}
                  />
                ))
              )}
            </div>

            {/* View More Button */}
            <div className="text-center mt-12">
              <button

                onClick={() => navigate('/main/investment')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all text-gray-600 hover:text-blue-600">
                더 많은 스타트업 보기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default Marketplace;