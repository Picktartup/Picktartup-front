import React, { useState } from "react";
import Card from "components/card";

const Menubar = ({ onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState("purchase");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onSelectMenu(menu);
  };

  return (
    <Card extra="!flex-row items-center justify-center rounded-[20px] lg:px-36 md:px-24 sm:px-16 py-6">
      <div className="flex justify-evenly w-full whitespace-nowrap">
        <button
          className={`text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "purchase" ? "text-navy-700" : "text-gray-700"
          } hover:text-navy-700`}
          onClick={() => handleMenuClick("purchase")}
        >
          토큰 구매
        </button>
        <button
          className={`text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "exchange" ? "text-navy-700" : "text-gray-700"
          } hover:text-navy-700`}
          onClick={() => handleMenuClick("exchange")}
        >
          현금화 신청
        </button>
        <button
          className={`text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "history" ? "text-navy-700" : "text-gray-700"
          } hover:text-navy-700`}
          onClick={() => handleMenuClick("history")}
        >
          결제 내역
        </button>
      </div>
    </Card>
  );
};

export default Menubar;
