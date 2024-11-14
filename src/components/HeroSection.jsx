// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden">
      {/* 그래픽 요소 */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-yellow-300 to-red-500 rounded-full opacity-40 animate-bounce-slow"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-r from-green-300 to-blue-500 rounded-full opacity-40 animate-bounce-slow"></div>
      
      {/* 텍스트 콘텐츠 */}
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
        지금, 투자 기회를 잡아보세요!
      </h1>
      <p className="text-lg font-medium mb-8 drop-shadow-md">
        새롭고 혁신적인 스타트업들이 당신의 참여를 기다립니다.
      </p>
      
      {/* 유도 버튼 */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-yellow-400 text-navy-700 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition duration-300">
          지금 투자하기
        </button>
        <button className="px-6 py-3 bg-transparent border-2 border-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-blue-500 transition duration-300">
          더 알아보기
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
