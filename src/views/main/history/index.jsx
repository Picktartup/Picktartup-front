import React, { useState, useEffect } from "react";
import ActiveInvest from "./components/ActiveInvest";
import CompletedInvest from "./components/CompletedInvest";
import Menubar from "./components/Menubar";

const ProfileOverview = () => {
  const [selectedMenu, setSelectedMenu] = useState("contractActive");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // 탭 메뉴에 따라 API 호출
    const fetchData = async () => {
      try {
        const endpoint =
          selectedMenu === "contractActive"
            ? "https://picktartup.local:31158/contract/api/v1/contracts/status/active"
            : "https://picktartup.local:31158/contract/api/v1/contracts/status/completed";
        const response = await fetch(endpoint);
        const result = await response.json();
        setTableData(result.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        setTableData([]);
      }
    };

    fetchData();
  }, [selectedMenu]);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <div className="mt-3">
            <Menubar onSelectMenu={(menu) => setSelectedMenu(menu)} />
          </div>
          {selectedMenu === "contractActive" ? (
            <ActiveInvest tableData={tableData} />
          ) : (
            <CompletedInvest tableData={tableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
