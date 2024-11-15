import React, { useState } from "react";
import Card from "components/card";

const Menubar = ({ onSelectMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState("contractActive");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    onSelectMenu(menu);
  };

  return (
    <Card extra="!flex-row items-center justify-center rounded-[20px] lg:px-36 md:px-24 sm:px-16 py-6">
      <div className="flex justify-evenly w-full whitespace-nowrap">
        <button
          className={`text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "contractActive" ? "text-navy-700" : "text-gray-700"
          } hover:text-navy-700`}
          onClick={() => handleMenuClick("contractActive")}
        >
          진행 중인 투자 내역
        </button>
        <button
          className={`text-[18px] flex-grow font-bold text-center ${
            selectedMenu === "contractCompleted" ? "text-navy-700" : "text-gray-700"
          } hover:text-navy-700`}
          onClick={() => handleMenuClick("contractCompleted")}
        >
          완료된 투자 내역
        </button>
      </div>
    </Card>
  );
};

export default Menubar;
