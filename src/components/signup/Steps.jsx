// src/components/signup/Steps.jsx
import React from 'react';

const Steps = ({ currentStep }) => {
  return (
    <div className="w-full max-w-[600px] mb-8">
      <div className="flex items-center">
        <div className={`flex-1 text-center ${currentStep === 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
          <div className="relative">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <div className="mt-2">회원정보 입력</div>
          </div>
        </div>
        <div className={`flex-1 border-t-2 ${currentStep === 2 ? 'border-indigo-600' : 'border-gray-200'}`}></div>
        <div className={`flex-1 text-center ${currentStep === 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
          <div className="relative">
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <div className="mt-2">토큰 지갑 생성</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;