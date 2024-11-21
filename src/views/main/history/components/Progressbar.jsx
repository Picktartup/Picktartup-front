import React from "react";

const ProgressBar = ({ investmentData }) => {
  const getProgressStage = () => {
    switch (investmentData.contractStatus) {
      case "CANCELLED":
        return -1; // 모든 단계 회색 처리
      case "BEGIN":
        return 1; // 1단계만 활성화
      case "ACTIVE":
        return 2; // 2단계까지 활성화
      case "COMPLETED":
        return 3; // 3단계까지 활성화
      default:
        return 0; // 기본값
    }
  };

  const formatDate = (dateString, status, step) => {
    if (status === "CANCELLED") {
      return dateString ? new Date(dateString).toLocaleDateString("ko-KR") : "취소됨";
    } else if (status === "ACTIVE" && step === "계약 완료") {
      return dateString ? `${new Date(dateString).toLocaleDateString("ko-KR")} 예정` : "미정";
    } else {
      return dateString ? new Date(dateString).toLocaleDateString("ko-KR") : "미정";
    }
  };
  
  const currentStage = getProgressStage();
  
  const steps = [
    {
      label: "투자 등록",
      date: formatDate(investmentData.investAt, investmentData.contractStatus, "투자 등록"),
    },
    {
      label: "계약 체결",
      date:
        investmentData.contractStatus === "BEGIN"
          ? "미정"
          : formatDate(investmentData.contractBeginAt, investmentData.contractStatus, "계약 체결"),
    },
    {
      label: "계약 완료",
      date:
        investmentData.contractStatus === "BEGIN"
          ? "미정"
          : investmentData.contractStatus === "ACTIVE"
          ? formatDate(investmentData.contractEndAt, investmentData.contractStatus, "계약 완료")
          : formatDate(investmentData.contractEndAt, investmentData.contractStatus, "계약 완료"),
    },
  ];
  
  // BEGIN 조건 추가
  if (investmentData.contractStatus === "BEGIN") {
    steps[1].date = "미정"; // 계약 체결
    steps[2].date = "미정"; // 계약 완료
  }
  
  // ACTIVE 조건 추가
  if (investmentData.contractStatus === "ACTIVE") {
    steps[2].date = formatDate(investmentData.contractEndAt, investmentData.contractStatus, "계약 완료");
  }
  
  // COMPLETED 조건은 기본 포맷으로 처리
  // CANCELLED 조건 추가
  if (investmentData.contractStatus === "CANCELLED") {
    steps[1].date = investmentData.contractBeginAt
      ? new Date(investmentData.contractBeginAt).toLocaleDateString("ko-KR")
      : "취소됨";
    steps[2].date = investmentData.contractEndAt
      ? new Date(investmentData.contractEndAt).toLocaleDateString("ko-KR")
      : "취소됨";
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">투자 진행 현황</h2>
      <div className="flex items-center justify-between max-w-lg mx-auto my-2">
        {steps.map((step, index) => {
          const isActive = currentStage > index;
          const isCurrent = currentStage === index + 1;
          const isCancelled = currentStage === -1;

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              {/* Line connector */}
              {index < 2 && (
                <div
                  className={`absolute top-5 w-full transition-colors duration-500 ${
                    isCancelled
                      ? "bg-gray-300"
                      : isActive
                      ? "bg-violet-500"
                      : "bg-gray-300"
                  }`}
                  style={{
                    height: "2px",
                    left: "50%",
                    zIndex: 0,
                  }}
                />
              )}

              {/* Circle */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 relative z-10 ${
                  isCancelled
                    ? "border-gray-300 bg-gray-100 text-gray-500"
                    : isCurrent
                    ? "border-violet-500 bg-violet-100 text-violet-500"
                    : isActive
                    ? "border-violet-500 bg-violet-500 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                {isActive && !isCancelled ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-lg font-bold">-</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm font-medium ${
                  isCancelled ? "text-gray-500" : isActive || isCurrent ? "text-gray-800" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
              <span className="text-xs text-gray-500">{step.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
