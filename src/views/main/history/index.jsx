import React, { useState } from "react";
import ActiveInvest from "./components/ActiveInvest";
import CompletedInvest from "./components/CompletedInvest"; // 추가
import Menubar from "./components/Menubar";
import activeTableData from "./variables/activeTableData.json";
import completedTableData from "./variables/completedTableData.json";

const ProfileOverview = () => {
  const [selectedMenu, setSelectedMenu] = useState("contractActive");

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12 lg:!mb-0">
          <div className="mt-3">
            <Menubar onSelectMenu={(menu) => setSelectedMenu(menu)} />
          </div>
          {selectedMenu === "contractActive" ? (
            <ActiveInvest tableData={activeTableData} />
          ) : (
            <CompletedInvest tableData={completedTableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
