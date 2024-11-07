import React, { useState } from "react";
import Card from "components/card";

const Menubar = ({ onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onSelectMenu(menu);
  };

  return (
    <Card extra="!flex-row items-center justify-center rounded-[20px] lg:px-36 md:px-24 sm:px-16 py-6">
      <div className="flex justify-evenly w-full whitespace-nowrap">
        <button
          className={`font-KR text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "purchase" ? "text-navy-700" : "text-black"
          } hover:text-gray-500`}
          onClick={() => handleMenuClick("contractAll")}
        >
         투자내역 조회
        </button>
        <button
          className={`font-KR text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "history" ? "text-navy-700" : "text-black"
          } hover:text-gray-500`}
          onClick={() => handleMenuClick("contractCompleted")}
        >
          완료된 투자내역 조회
        </button>
        <button
          className={`font-KR text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "exchange" ? "text-navy-700" : "text-black"
          } hover:text-gray-500`}
          onClick={() => handleMenuClick("contractImage")}
        >
          계약서 이미지 조회
        </button>
      </div>
    </Card>
  );
};

export default Menubar;
