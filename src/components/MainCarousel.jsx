import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 이미지 경로
import unicornImage from '../assets/img/main/unicorncoin.jpg';
import coinImage from '../assets/img/main/coin.jpg';
import contractImage from '../assets/img/main/contract.jpg';
import angelImage from '../assets/img/main/angel.jpg';

const MainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 슬라이드 데이터
  const slides = [
    {
      title: "스타트업의 미래를 함께 만드는",
      subtitle: "블록체인 투자 플랫폼",
      description: "혁신적인 스타트업에 투자하고 미래의 성장을 함께하세요",
      image: unicornImage,
    },
    {
      title: "소액으로 시작하는 투자",
      subtitle: "누구나 쉽게 시작하는 투자",
      description: "1000원부터 시작하는 스마트한 분산 투자로 리스크는 줄이고 기회는 높이세요",
      image: coinImage,
    },
    {
      title: "투명한 거래와 안전한 보관",
      subtitle: "블록체인 기반 안전 시스템",
      description: "모든 거래 내역이 블록체인에 기록되어 투명하게 관리되며, 디지털 자산을 안전하게 보관합니다",
      image: contractImage,
    },
    {
      title: "당신이 바로 엔젤 투자자",
      subtitle: "미래 유니콘을 발굴하세요",
      description: "잠재력 있는 스타트업을 발굴하고 성장의 기회를 함께하세요",
      image: angelImage,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div
      className={`relative w-full max-w-6xl mx-auto overflow-hidden transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ height: '400px' }}
    >
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-full h-full flex items-center justify-center"
          >
            {/* 이미지 */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-auto h-full object-contain"
              style={{ transform: 'scaleX(1.4)' }} // 가로 비율을 40% 늘림
            />

            {/* 텍스트 컨텐츠 */}
            <div className="relative z-10 text-center px-16 text-violeat">
              <p className="text-lg font-medium">{slide.subtitle}</p>
              <h2 className="text-4xl font-bold leading-tight">{slide.title}</h2>
              <p className="text-lg leading-relaxed mt-4">{slide.description}</p>

              {index === 0 && (
                <div className="flex gap-4 pt-6 justify-center">
                  <button className="px-6 py-2.5 bg-blue-600 text-violeat rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    시작하기
                  </button>
                  <button className="px-6 py-2.5 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors">
                    더 알아보기
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all transform ${
              currentSlide === index
                ? 'bg-gray-800 scale-100'
                : 'bg-gray-500 scale-75 hover:scale-90'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;
