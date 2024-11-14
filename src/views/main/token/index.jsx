import React, { useState, useEffect } from "react";
import axios from "axios";

import Menubar from "components/menubar";
import VideoWithTransparency from "components/VideoWithTransparency";
import PurchaseTable from "./components/PurchaseTable";
import HistoryTable from "./components/HistoryTable";
import ExchangeTable from "./components/ExchangeTable";

const Tables = () => {
  const historyTableTitle = "토큰 구매/현금화 내역";
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("purchase");
  const [tableData, setTableData] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetchMenuData("history");

    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/v1/coins/balance?walletId=1'); // TODO: 수정
        const data = await response.json();
        setBalance(data.data);
      } catch (error) {
        console.error('잔액 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchBalance();
  }, []);

  const fetchMenuData = async (menu) => {
    if (menu === "history" && tableData.length > 0) return;

    const endpoint = "/api/v1/coins/purchases?userId=1";

    try {
      const response = await axios.get(endpoint);
      setApiData(response.data);

      if (menu === "history") {
        const formattedData = response.data.data.map((transaction) => ({
          date: transaction.tCreatedAt,
          type: transaction.tType,
          token: transaction.tCoinAmount,
          method: transaction.tType === "PAYMENT" ? transaction.tPayMethod : transaction.tExcBank,
        }));
        setTableData(formattedData);
      }
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const renderApiData = () => {
    if (error) return <p className="text-red-500">{error}</p>;

    switch (selectedMenu) {
      case "purchase":
        return <PurchaseTable />;
      case "history":
        return (
          <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-1">
            <HistoryTable
              tableTitle={historyTableTitle}
              tableData={tableData}
            />
          </div>
        );
      case "exchange":
        return <ExchangeTable balance={balance} />;
      default:
        return <p>Select a menu to see the data.</p>;
    }
  };

  return (
    <div>
      <h1 className="p-8 text-2xl font-bold text-gray-800 mt-1 mb-2">보유 토큰</h1>
      <div className="flex items-center space-x-4 px-4 pb-4">
        <VideoWithTransparency className="w-1/3 md:w-1/4 hidden md:inline" />
        <div className="text-center border-r border-gray-300 pr-8">
          <h2 className="text-md font-medium text-gray-600 mb-2">총 보유 토큰</h2>
          <p className="text-2xl font-bold text-gray-800">
            {balance !== null ? `${balance} PCK` : '잔액을 불러오는 중...'}
          </p>
        </div>
        <div className="bg-white text-violet-800 p-6 text-center rounded-lg lg:mx-36 md:mx-20 sm:mx-4">
          <p className="mb-2 font-semibold text-xl">토큰이란?</p>
          <p className="text-md">원하는 스타트업에게 투자를 할 수 있도록 해주는 가상의 자산입니다.</p>
        </div>
      </div>
      <div className="mt-5">
        <Menubar onSelectMenu={(menu) => setSelectedMenu(menu)} />
      </div>
      <div className="mt-2 p-4 rounded-md">{renderApiData()}</div>
    </div>
  );
};

export default Tables;
