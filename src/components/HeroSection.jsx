import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ChevronRight, TrendingUp, Shield } from 'lucide-react';
import backgroundImage from 'assets/img/profile/img1.jpg';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg"
  >
    <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 left-8 md:left-[10%]"
        >

        </motion.div>

        {/* Main content container */}
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 left-4 md:left-[5%] z-20" // 위치 수정
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Coins className="w-5 h-5 text-white mr-2" />
                <span className="text-sm font-medium text-white">토큰 분산 투자 플랫폼</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
            >
              스타트업의 미래를 함께 만드는
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                블록체인 투자 플랫폼
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              PCK 토큰으로 투명하고 안전하게 스타트업에 투자하세요
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={() => navigate('/main/investment')}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center backdrop-blur-sm">
                지금 시작하기
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20 backdrop-blur-sm">
                자세히 알아보기
              </button>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <FeatureCard
              icon={Coins}
              title="토큰 기반 투자"
              description="블록체인 기술로 구현된 토큰으로 소액부터 투자가 가능합니다."
            />
            <FeatureCard
              icon={TrendingUp}
              title="투명한 거래"
              description="모든 거래 내역이 블록체인에 기록되어 투명하게 관리됩니다."
            />
            <FeatureCard
              icon={Shield}
              title="안전한 보관"
              description="디지털 자산을 안전하게 보관하고 관리할 수 있습니다."
            />
          </motion.div>
        </div>
      </div>

      {/* Wave Effect with adjusted opacity */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 79.875C1248 88.75 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="white"
            className="opacity-95"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
