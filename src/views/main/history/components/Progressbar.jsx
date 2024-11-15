import React from "react";

const ProgressBar = (props) => {
  const { investmentData } = props;

  const getProgressStage = () => {
    if (investmentData.contractEndAt) return 3;
    if (investmentData.contractBeginAt) return 2;
    if (investmentData.investAt) return 1;
    return 0;
  };

  const formatDate = (dateString) => (dateString ? new Date(dateString).toLocaleDateString("ko-KR") : "미정");

  const currentStage = getProgressStage();

  const steps = [
    { label: "투자 등록", date: formatDate(investmentData.investAt) },
    { label: "계약 체결", date: formatDate(investmentData.contractBeginAt) },
    { label: "계약 완료", date: formatDate(investmentData.contractEndAt) },
  ];

  return (
    <div className="flex items-center justify-between max-w-lg mx-auto my-4">
      {steps.map((step, index) => {
        const isActive = index < currentStage;
        const isCurrent = index === currentStage;

        return (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                isCurrent
                  ? "border-violet-500 bg-violet-100"
                  : isActive
                  ? "border-violet-500 bg-violet-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {isActive ? (
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
                <span className="font-semibold">{index + 1}</span>
              )}
            </div>

            {/* Label */}
            <span className={`mt-2 text-sm font-medium ${isActive || isCurrent ? "text-gray-800" : "text-gray-500"}`}>
              {step.label}
            </span>
            <span className="text-xs text-gray-500">{step.date}</span>

            {/* Line connector */}
            {index < 2 && (
              <div
                className={`absolute top-5 left-1/4 h-1 w-full transition-colors duration-500 ${
                  isActive ? "bg-violet-500" : "bg-gray-300"
                }`}
                style={{ transform: "translateX(50%)", width: "calc(100% - 40px)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;