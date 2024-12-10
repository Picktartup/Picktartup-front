import React, { useState } from "react";
import Card from "components/card";

const Menubar = ({ onSelectMenu }) => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    onSelectMenu(newActiveState ? "contractActive" : "contractCompleted");
  };

  return (
    <Card extra="!flex-row items-center justify-between rounded-[20px] lg:px-28 md:px-18 sm:px-8 py-6">
      {/* 텍스트 영역 */}
      <div className="flex items-center">
        <span
          className={`text-[18px] font-bold ${
            isActive ? "text-navy-700" : "text-gray-500"
          }`}
        >
          진행 중인 투자 내역
        </span>
        <span className="mx-4 text-[18px] font-bold text-gray-500">|</span>
        <span
          className={`text-[18px] font-bold ${
            !isActive ? "text-navy-700" : "text-gray-500"
          }`}
        >
          완료된 투자 내역
        </span>
      </div>

      {/* 토글 스위치 */}
      <div
        className="relative flex items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ${
            isActive ? "bg-navy-700" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isActive ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
    </Card>
  );
};

export default Menubar;
