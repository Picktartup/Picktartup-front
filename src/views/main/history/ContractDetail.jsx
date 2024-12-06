import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StartupProfile from "./components/StartupProfile";
import ProgressBar from "./components/Progressbar";
import InvestmentInfo from "./components/InvestmentInfo";
import ContractPaper from "./components/ContractPaper";

const ContractDetail = () => {
  const { id } = useParams();

  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작

        // 계약 상세 내역 API 호출
        const contractResponse = await fetch(`https://picktartup.local/contract/api/v1/contracts/details/${id}`);
        const response = await contractResponse.json();

        // 상태 업데이트
        setInvestmentData(response.data);
      } catch (err) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다.", err);
        setError(err.message || "데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 상태 표시
  }

  if (error) {
    return <div>오류 발생: {error}</div>; // 오류 메시지 표시
  }

  return (
    <div className="mt-2 p-8 max-w-4xl mx-auto space-y-4 mb-16">
      {investmentData && (
        <>
          <StartupProfile
            investmentData={investmentData}
          />
          <ProgressBar 
            investmentData={investmentData} 
          />
          <InvestmentInfo
            investmentData={investmentData}
          />
          <ContractPaper 
            investmentData={investmentData}
          />
        </>
      )}
    </div>
  );
};

export default ContractDetail;
