import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Filter, ArrowRight } from 'lucide-react';
import HeroSection from 'components/HeroSection';
import SimpleStats from 'components/SimpleStats';
import defaultImage from 'assets/img/nfts/default.png';
import { useNavigate } from 'react-router-dom';
import NftCard from 'components/card/NftCard';

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

const StartupCard = ({ startup, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick(startup.startupId)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getImageByName(startup.name)}
          alt={startup.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600">
            {startup.category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{startup.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>{formatDate(startup.investmentStartDate)}</span>
            <span>~</span>
            <span>{formatDate(startup.investmentTargetDeadline)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">투자 진행률</span>
            <span className="font-medium text-blue-600">{startup.fundingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${startup.fundingProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{startup.currentCoin.toLocaleString()} PCK</span>
            <span>{startup.goalCoin.toLocaleString()} PCK</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Marketplace = () => {
  // 임시 스타트업 정보
  const [startups, setStartups] = useState([
    {
      startupId: 1,
      name: 'Startup A',
      category: 'Technology',
      investmentStartDate: '2024-11-01',
      investmentTargetDeadline: '2024-12-31',
      fundingProgress: 75,
      currentCoin: 50000,
      goalCoin: 100000,
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  /*
  const fetchStartups = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/v1/startups/top', {
        params: { source: 'jpa' }
      });
      setStartups(response.data.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);
  */

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <HeroSection />
      <SimpleStats />

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
                investmentStartDate={startup.investmentStartDate}
                investmentTargetDeadline={startup.investmentTargetDeadline}
                fundingProgress={startup.fundingProgress}
                currentCoin={startup.currentCoin}
                goalCoin={startup.goalCoin}
                image={getImageByName(startup.name)}
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