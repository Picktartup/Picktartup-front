import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { extractUserIdFromToken, isTokenExpired } from "utils/jwtUtils";

import Menubar from "components/menubar";
import VideoWithTransparency from "components/VideoWithTransparency";
import PurchaseTable from "./components/PurchaseTable";
import HistoryTable from "./components/HistoryTable";
import ExchangeTable from "./components/ExchangeTable";

const Tables = () => {
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("purchase");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const historyTableTitle = "토큰 구매/현금화 내역";

  useEffect(() => {
    // JWT에서 userId 추출 및 토큰 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No token found. Redirecting to login...");
      navigate("/auth/sign-in"); // 로그인 페이지로 리다이렉트
      return;
    }

    if (isTokenExpired(token)) {
      console.warn("Token has expired. Redirecting to login...");
      navigate("/auth/sign-in"); // 로그인 페이지로 리다이렉트
      return;
    }

    const extractedUserId = extractUserIdFromToken(token);
    setUserId(extractedUserId);
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    // 사용자 잔액과 기본 메뉴 데이터 불러오기
    fetchBalance();
    fetchMenuData(selectedMenu);
  }, [userId, selectedMenu]);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `https://picktartup.com/api/v1/coins/balance?userId=${userId}`
      );
      setBalance(response.data.data);
    } catch (error) {
      console.error("잔액 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchMenuData = async (menu) => {
    if (menu === "history" && tableData.length > 0) return;

    setLoading(true);
    const endpoint = `https://picktartup.com/api/v1/coins/purchases?userId=${userId}`;

    try {
      const response = await axios.get(endpoint);
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
    } finally {
      setLoading(false);
    }
  };

  const renderApiData = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    switch (selectedMenu) {
      case "purchase":
        return <PurchaseTable />;
      case "history":
        return (
          <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-1">
            <HistoryTable tableTitle={historyTableTitle} tableData={tableData} />
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
            {balance !== null ? `${balance} PCK` : "잔액을 불러오는 중..."}
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
