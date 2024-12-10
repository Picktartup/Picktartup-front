import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


import video from "../assets/img/main/BLACK2.mp4"


const MainVideo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "스타트업의 미래를 함께",
      subtitle: "토큰증권 조각 투자 플랫폼",
      description: "혁신적인 스타트업에 투자하고 미래의 성장을 함께하세요",
      type: 'video',
      content: video,
    },
    {
      title: "소액으로 시작하는 투자",
      subtitle: "누구나 쉽게 시작하는 투자",
      description: "스마트한 조각 투자로 리스크는 줄이고 기회는 높이세요",
      type: 'video',
      content: video,
    },
    {
      title: "투명한 거래와 안전한 보관",
      subtitle: "블록체인 기술로 구현된 토큰 기반 안전 시스템",
      description: "모든 거래 내역이 블록체인에 기록되어 투명하게 관리되며, 디지털 자산을 안전하게 보관합니다",
      type: 'video',
      content: video,
    },
    {
      title: "당신이 바로 엔젤 투자자",
      subtitle: "미래 유니콘을 발굴하세요",
      description: "잠재력 있는 스타트업을 발굴하고 성장의 기회를 함께하세요",
      type: 'video',
      content: video,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 70000);
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
      className={`relative w-full max-w-5xl mx-auto overflow-hidden transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{ height: '320px' }}
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
            {slide.type === 'video' ? (
              <video
                src={slide.content}
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
              />
            ) : (
              <img
                src={slide.content}
                alt={slide.title}
                className="absolute w-auto h-full object-contain"
              />
            )}

            <div className="relative z-10 text-center px-12 text-white">
              <p className="text-base font-medium">{slide.subtitle}</p>
              <h2 className="text-3xl font-bold leading-tight mt-1">{slide.title}</h2>
              <p className="text-base leading-relaxed mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-black transition-all backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all transform ${
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

export default MainVideo;