import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, Shield } from 'lucide-react';
import backgroundImage from 'assets/img/profile/img1.jpg';

const slides = [
  {
    id: 1,
    tag: "토큰 분산 투자 플랫폼",
    title: "스타트업의 미래를 함께 만드는",
    subtitle: "블록체인 투자 플랫폼",
    description: "PCK 토큰으로 투명하고 안전하게 스타트업에 투자하세요",
    icon: <Coins className="w-6 h-6 text-blue-400" />
  },
  {
    id: 2,
    tag: "토큰 기반 투자",
    title: "블록체인으로 시작하는",
    subtitle: "스마트한 투자",
    description: "블록체인 기술로 구현된 토큰으로 소액부터 투자가 가능합니다",
    icon: <Coins className="w-6 h-6 text-green-400" />
  },
  {
    id: 3,
    tag: "투명한 거래",
    title: "실시간으로 확인하는",
    subtitle: "투명한 거래 내역",
    description: "모든 거래 내역이 블록체인에 기록되어 투명하게 관리됩니다",
    icon: <TrendingUp className="w-6 h-6 text-purple-400" />
  },
  {
    id: 4,
    tag: "안전한 보관",
    title: "신뢰할 수 있는",
    subtitle: "자산 보관 시스템",
    description: "최고 수준의 보안 시스템으로 디지털 자산을 안전하게 보호합니다",
    icon: <Shield className="w-6 h-6 text-orange-400" />
  }
];

const ContentSlide = ({ content, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0"
  >
    <motion.div
      className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
    >
      {content.icon}
      <span className="text-sm font-medium text-white ml-2">{content.tag}</span>
    </motion.div>

    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      <span className="text-white">{content.title}</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
        {content.subtitle}
      </span>
    </h1>

    <p className="text-xl text-white/90 mb-8">{content.description}</p>
  </motion.div>
);

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
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
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <ContentSlide 
              key={currentSlide}
              content={slides[currentSlide]} 
              isVisible={true}
            />
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-blue-400' : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wave Effect */}
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