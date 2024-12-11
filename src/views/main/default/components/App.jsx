import React, { useState, useEffect } from "react";
import InvestmentRoundTimeline from "./InvestmentRoundTimeline";
import SSI from "./SSI";
import axios from "axios";

const App = () => {
  const [currentRound, setCurrentRound] = useState("");
  const [startupId, setStartupId] = useState(null); // startupId 상태 추가
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  // 투자 라운드 변경 핸들러
  const handleRoundChange = (newRound) => {
    console.log("투자 라운드 변경됨:", newRound);
    setCurrentRound(newRound);
  };

  // startupId 불러오기
  useEffect(() => {
    const fetchStartupId = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const response = await axios.get("https://picktartup.com/api/v1/startups", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}` // 인증 토큰 추가
          }
        });

        // 예시: 첫 번째 스타트업의 ID 가져오기
        const firstStartup = response.data.data?.[0]; // 응답 데이터 구조에 따라 수정
        if (firstStartup?.id) {
          setStartupId(firstStartup.id); // ID 설정
        } else {
          throw new Error("Startup ID를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Startup ID를 불러오는 중 오류 발생:", error);
        setError("Startup ID를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchStartupId();
  }, []);

  // 로딩 또는 오류 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* 투자 라운드 타임라인 */}
      <InvestmentRoundTimeline
        startupId={startupId}
        onRoundChange={handleRoundChange} // 투자 라운드 변경 핸들러
      />

      {/* SSI 컴포넌트 */}
      <SSI
        currentRound={currentRound}
        startupId={startupId} // startupId 전달
      />
    </div>
  );
};

export default App;
