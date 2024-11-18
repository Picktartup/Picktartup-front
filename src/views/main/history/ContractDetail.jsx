import React from "react";
import { useParams } from "react-router-dom";
import StartupProfile from "./components/StartupProfile";
import ProgressBar from "./components/Progressbar";
import InvestmentInfo from "./components/InvestmentInfo";
import ContractPaper from "./components/ContractPaper";

const ContractDetail = () => {
  const { id } = useParams();

  // contractId로 요청한 계약 상세 내역 + startupId로 요청한 스타트업 프로필 내역
  const investmentData = {
    id,
    contractStatus: "ACTIVE",
    startupName: "레브잇",
    investAt: "2023-10-11",
    contractBeginAt: "2023-11-01",
    contractEndAt: null,
    investToken: 500,
    returnToken: null,
    process: 60,
    roi: null,
  };

  const profileData = {
    logo: "https://grepp-programmers.s3.amazonaws.com/production/company/logo/9278/LevitLogo4.png",
    desc: "모바일 초저가 커머스 플랫폼 '올웨이즈'를 운영하는 기업",
    category: "커머스, 푸드",
    ssi: "든든 기업",
    investStatus: "비상장",
    investRound: "Series A",
    expectedRoi: "60",
  }

  return (
    <div className="mt-2 p-8 max-w-4xl mx-auto space-y-4">
      <StartupProfile investmentData={investmentData} profileData={profileData} />
      <ProgressBar investmentData={investmentData} />
      <InvestmentInfo investmentData={investmentData} profileData={profileData} />
      <ContractPaper />
    </div>
  );
};

export default ContractDetail;
