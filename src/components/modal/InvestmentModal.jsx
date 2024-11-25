import React, { useState } from "react";
import Modal from "components/modal";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";
import { toast } from "react-toastify"; // react-toastify import

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const InvestmentModal = ({ isOpen, onClose, campaignId }) => {
  const [step, setStep] = useState(1);
  const [tokenAmount, setTokenAmount] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleInvestmentSubmit = async () => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      alert("유효한 토큰 수량을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const requestData = {
        userId: 1,
        startupId: campaignId,
        contractAt: new Date().toISOString(),
        contractAddress: "0x1234567890abcdef",
        amount: parseFloat(tokenAmount),
        investorSignature: "SIGNATURE_INVESTOR",
        startupSignature: "SIGNATURE_STARTUP",
        transactionHash: null,
      };

      const response = await axios.post("/api/v1/contracts/pdf", requestData);
      setPdfUrl(response.data.data);
      goToNextStep();
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("계약서를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async () => {
    if (!isAgreed) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    // 모달 닫기
    onClose();

    // 처리 중 토스트 생성
  const toastId = toast.loading("토큰을 전송 중입니다...", {
    autoClose: false, // 자동 닫힘 없음
    closeOnClick: false, // 클릭으로 닫기 비활성화
    onClose: () => {
      console.log("토큰 전송 중 토스트가 닫혔습니다.");
    },
  });

  try {
    const response = await axios.post(`/api/v1/startup-funding/campaigns/${campaignId}/invest`, {
      userId: process.env.REACT_APP_MOCK_USER_ID,
      amount: parseFloat(tokenAmount),
      walletPassword: process.env.REACT_APP_MOCK_WALLET_PW,
    });

    if (response.status === 200 && response.data.success) {
      const { amount, totalRaised, transactionHash } = response.data.data;
      console.log("투자 금액:", amount);
      console.log("모금 총액:", totalRaised);
      console.log("트랜잭션 해시:", transactionHash);

      // 토스트가 닫혔는지 확인한 후 성공 메시지 출력
      if (toast.isActive(toastId)) {
        toast.update(toastId, {
          render: "투자가 완료되었습니다!",
          type: "success",
          isLoading: false, // 로딩 상태 해제
          autoClose: 5000,
        });
      } else {
        toast.success("투자가 완료되었습니다!", { autoClose: 5000 });
      }
    } else {
      // 실패 시 처리
      if (toast.isActive(toastId)) {
        toast.update(toastId, {
          render: "요청은 처리되었지만 실패했습니다. 관리자에게 문의해주세요.",
          type: "error",
          isLoading: false, // 로딩 상태 해제
          autoClose: 5000,
        });
      } else {
        toast.error("요청은 처리되었지만 실패했습니다. 관리자에게 문의해주세요.", { autoClose: 5000 });
      }
    }
  } catch (error) {
    // 에러 발생 시 처리
    if (toast.isActive(toastId)) {
      toast.update(toastId, {
        render: "오류가 발생했습니다.",
        type: "error",
        isLoading: false, // 로딩 상태 해제
        autoClose: 5000,
      });
    } else {
      toast.error("오류가 발생했습니다.", { autoClose: 5000 });
    }
    console.error("투자 요청 실패:", error.response || error.message || error);
  }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={step === 3 ? "lg" : "md"}>
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">투자하기</h2>
          <p className="text-sm text-gray-600 mb-6">이 스타트업에 투자하시겠습니까?</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              취소
            </button>
            <button
              onClick={goToNextStep}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">투자할 토큰 수량</h2>
          <div className="mb-4">
            <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-700">
              토큰 수량
            </label>
            <input
              type="number"
              id="tokenAmount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="토큰 수량 입력"
            />
          </div>
          <button
            onClick={handleInvestmentSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "로딩 중..." : "투자하기"}
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">계약서 확인</h2>
          {pdfUrl ? (
            <div className="h-96 overflow-auto border border-gray-200 rounded-lg mb-4">
              <Document file={pdfUrl}>
                <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
              </Document>
            </div>
          ) : (
            <p>계약서를 불러오는 중입니다...</p>
          )}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agreement" className="text-sm text-gray-700">
              약관에 동의합니다.
            </label>
          </div>
          <button
            onClick={handleFinalSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            완료
          </button>
        </div>
      )}
    </Modal>
  );
};

export default InvestmentModal;
