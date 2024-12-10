import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActiveInvest from "./components/ActiveInvest";
import CompletedInvest from "./components/CompletedInvest";
import Menubar from "./components/Menubar";
import { extractUserIdFromToken, isTokenExpired } from "utils/jwtUtils";


const ProfileOverview = () => {
  const [selectedMenu, setSelectedMenu] = useState("contractActive");
  const [tableData, setTableData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // JWT 토큰에서 userId 추출 및 유효성 검증
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No token found. Redirecting to login...");
      navigate("/auth/sign-in"); // 로그인 페이지로 리다이렉트
      setError("No access token found.");
      return;
    }

    if (isTokenExpired(token)) {
      console.warn("Token has expired. Redirecting to login...");
      navigate("/auth/sign-in"); // 로그인 페이지로 리다이렉트
      setError("Token has expired.");
      return;
    }

    const extractedUserId = extractUserIdFromToken(token);
    setUserId(extractedUserId);
  }, [navigate]);

  useEffect(() => {
    // userId가 설정된 후 API 호출
    const fetchData = async () => {
      if (!userId) return;

      try {
        const endpoint =
          selectedMenu === "contractActive"
            ? `https://192.168.0.142:31158/contract/api/v1/contracts/status/active?userId=${userId}`
            : `https://192.168.0.142:31158/contract/api/v1/contracts/status/completed?userId=${userId}`;
        const response = await fetch(endpoint);
        const result = await response.json();
        setTableData(result.data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        setTableData([]);
      }
    };

    fetchData();
  }, [userId, selectedMenu]);

  return (
    <div className="flex w-full flex-col gap-5">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ProfileOverview;
