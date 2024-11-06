import {
  columnsDataColumns,
} from "./variables/columnsData";
import ColumnsTable from "./components/ColumnsTable";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Menubar from "components/menubar";

const Tables = () => {
  const historyTableTitle = "토큰 구매/현금화 내역";
  const [apiData, setApiData] = useState(null);                   // API 데이터 상태
  const [loading, setLoading] = useState(false);                  // 로딩 상태
  const [error, setError] = useState(null);                       // 오류 상태
  const [selectedMenu, setSelectedMenu] = useState("purchase");   // 기본 메뉴를 'purchase'로 설정
  const [tableData, setTableData] = useState([]);                 // ColumnsTable에 전달할 데이터

  // 첫 번째 메뉴인 'purchase'를 기본값으로 설정
  useEffect(() => {
    fetchMenuData("purchase");
  }, []);

  // 메뉴 클릭 시 API 요청 처리
  const fetchMenuData = async (menu) => {
    setLoading(true);
    setError(null);
    setSelectedMenu(menu);
    let endpoint;
    let method = "get";
    let payload = {}; // POST 요청 시 사용할 payload 데이터

    // 각 메뉴에 따라 엔드포인트 설정
    switch (menu) {
      case "purchase":
        endpoint = "/api/v1/coins/purchase";
        method = "post";
        payload = {
          walletId: 1,
          amount: 100,
        };
        break;
      case "history":
        endpoint = "/api/v1/coins/purchases?userId=1";
        method = "get";
        break;
      case "exchange":
        endpoint = "/api/v1/coins/exchange";
        method = "post";
        payload = {
          walletId: 1,
          exchangeAmount: 50,
        };
        break;
      default:
        return;
    }

    try {
      const response =
        method === "get"
          ? await axios.get(endpoint)
          : await axios.post(endpoint, payload);
      setApiData(response.data);

      if (menu === "history") {
        const formattedData = response.data.data.map((transaction) => ({
          date: transaction.createdAt,
          type: transaction.transactionType,
          token: transaction.coinAmount,
          balance: transaction.users.wallet.balance,
        }));
        setTableData(formattedData); 
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // 메뉴에 따른 데이터 렌더링 로직
  const renderApiData = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    // 선택한 메뉴에 따른 데이터 렌더링
    switch (selectedMenu) {
      case "purchase":
        return (
          <div>
            <p>id: {apiData?.data?.transactionId}</p>
            <p>구매량: {apiData?.data?.coinAmount}</p>
            <p>구매 후 잔액: {apiData?.data?.walletBalance}</p>
          </div>
        );
      case "history":
        return (
          <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
            <ColumnsTable
              tableTitle={historyTableTitle}
              columnsData={columnsDataColumns}
              tableData={tableData}
            />
          </div>
        );
      case "exchange":
        return (
          <div>
            <h2>신청 완료</h2>
            <p>신청 토큰: {apiData?.data?.exchangeAmount}</p>
            <p>환전 신청 전 토큰: {apiData?.data?.balanceBeforeExchange}</p>
            <p>환전 확정 후 토큰: {apiData?.data?.balanceAfterExchange}</p>
          </div>
        );
      default:
        return <p>Select a menu to see the data.</p>;
    }
  };

  return (
    <div>
      {/* Menubar 컴포넌트 추가 및 onSelectMenu 핸들러 설정 */}
      <div className="mt-5">
        <Menubar onSelectMenu={fetchMenuData} />
      </div>

      {/* API 결과 출력 */}
      <div className="mt-2 p-4 rounded-md">{renderApiData()}</div>
    </div>
  );
};

export default Tables;
