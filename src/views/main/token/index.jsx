import React, { useState, useEffect } from "react";
import axios from "axios";

import { columnsDataColumns } from "./variables/columnsData";
import ColumnsTable from "./components/ColumnsTable";
import PurchaseTable from "./components/PurchaseTable";
import Menubar from "components/menubar";

const Tables = () => {
  const historyTableTitle = "토큰 구매/현금화 내역";
  const [apiData, setApiData] = useState(null);                   // API 데이터 상태
  const [error, setError] = useState(null);                       // 오류 상태
  const [selectedMenu, setSelectedMenu] = useState("purchase");   // 기본 메뉴를 'purchase'로 설정
  const [tableData, setTableData] = useState([]);                 // ColumnsTable에 전달할 데이터

  // 초기 실행 시 history 데이터 한번 호출
  useEffect(() => {
    fetchMenuData("history");
  }, []);

  // 메뉴 클릭 시 API 요청 처리 (history 메뉴 제외)
  const fetchMenuData = async (menu) => {
    if (menu === "history" && tableData.length > 0) return; // 이미 호출된 경우, history 재호출 방지

    let endpoint;
    let method = "get";
    let payload = {}; // POST 요청 시 사용할 payload 데이터

    // 각 메뉴에 따라 엔드포인트 설정
    if (menu === "history") {
      endpoint = "/api/v1/coins/purchases?userId=1";
      method = "get";
    } else if (menu === "purchase") {
      endpoint = "/api/v1/coins/purchase";
      method = "post";
      payload = {
        walletId: 1,
        amount: 100,
      };
    } else if (menu === "exchange") {
      endpoint = "/api/v1/coins/exchange";
      method = "post";
      payload = {
        walletId: 1,
        exchangeAmount: 50,
      };
    } else {
      return;
    }

    try {
      const response =
        method === "get"
          ? await axios.get(endpoint)
          : await axios.post(endpoint, payload);

      setApiData(response.data);

      // 'history' 데이터를 테이블 형식으로 변환
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
    }
  };

  // 메뉴에 따른 데이터 렌더링 로직
  const renderApiData = () => {
    if (error) return <p className="text-red-500">{error}</p>;

    // 선택한 메뉴에 따른 데이터 렌더링
    switch (selectedMenu) {
      case "purchase":
        return (
          <div>
            <PurchaseTable />
          </div>
        );
      case "history":
        return (
          <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-1">
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
            <h2>환전 신청</h2>
            <button
              onClick={() => alert("환전 API 호출은 버튼 클릭 시 이루어집니다.")}  // 환전 예시 버튼
              className="bg-blue-600 opacity-80 text-white px-4 py-2 rounded-lg mt-2"
            >
              환전 요청
            </button>
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
        <Menubar onSelectMenu={(menu) => setSelectedMenu(menu)} />
      </div>

      {/* API 결과 출력 */}
      <div className="mt-2 p-4 rounded-md">{renderApiData()}</div>
    </div>
  );
};

export default Tables;
