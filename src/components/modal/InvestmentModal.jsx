import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "components/modal";
import SignatureCanvas from "react-signature-canvas";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";
import { toast } from "react-toastify";
import { extractUserIdFromToken, isTokenExpired } from "utils/jwtUtils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const InvestmentModal = ({ isOpen, onClose, campaignId }) => {
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);
  const [tokenAmount, setTokenAmount] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [authToken, setAuthToken] = useState(null); // 새 상태 추가

  const navigate = useNavigate();
  const signatureRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");  // 토큰 가져오기
    if (token && !isTokenExpired(token)) {
      setAuthToken(token);  // 유효한 토큰이 있으면 상태에 저장
    } else {
      //toast.error("세션이 만료되었습니다. 다시 로그인 해주세요.");
      onClose();  // 세션 만료 시 모달 닫기
    }
  }, [onClose]);  // onClose가 변경될 때마다 실행되도록 의존성 추가

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleInvestmentSubmit = async () => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      alert("유효한 토큰 수량을 입력해주세요.");
      return;
    }

    setIsLoading(true);

    if (!authToken) return; // If token is invalid or expired, return

    try {
      const requestData = {
        userId: extractUserIdFromToken(authToken),
        startupId: campaignId,
        contractAt: new Date().toISOString(),
        contractAddress: null,
        amount: parseFloat(tokenAmount),
        investorSignature: null,
        startupSignature: "SIGNATURE_STARTUP",
        transactionHash: null,
      };

      const response = await axios.post(
        "https://picktartup.local/contract/api/v1/contracts/pdf",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the Authorization header
          },
        }
      )
      setPdfUrl(response.data.data);
      goToNextStep();
    } catch (error) {
      console.error("PDF 생성 실패:", error);
      alert("계약서를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgreementSubmit = async () => {
    if (!isAgreed) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    goToNextStep();
  };

  const handleSignatureSubmit = async () => {
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      alert("서명을 완료해야 합니다.");
      return;
    }

    const signatureData = signatureRef.current.toDataURL();
    setSignatureUrl(signatureData);

    goToNextStep();
  };

  const updateBalance = async (userId) => {
    if (!authToken) return; // If token is invalid or expired, return

    try {
      const response = await axios.post(
        `https://picktartup.local/wallet/api/v1/wallets/${userId}/update-balance`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the Authorization header
          },
        }
      );
      console.log(response.data); // 성공 응답 출력
    } catch (error) {
      console.error('잔고 업데이트 중 오류 발생:', error);
    }
  };

  const handleFinalSubmit = async () => {
    if (!walletPassword) {
      alert("지갑 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    if (!authToken) return; // If token is invalid or expired, return

    // 모달 닫기
    onClose();

    const toastId = toast.loading("토큰을 전송 중입니다...", {
      autoClose: false,
      closeOnClick: false,
    });

    try {
      const userId = extractUserIdFromToken(authToken);

      const response = await axios.post(
        "https://picktartup.local/contract/api/v1/contracts/transaction",
        {
          userId: userId,
          startupId: 1,
          walletPassword: walletPassword,
          amount: parseFloat(tokenAmount),
          investorSignature: signatureUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the Authorization header
          },
        }
      );

      if (response.status === 200 && response.data.status === "OK") {
        //const { amount, totalRaised, transactionHash } = response.data.data;
        //console.log("투자 금액:", amount);
        //console.log("모금 총액:", totalRaised);
        //console.log("트랜잭션 해시:", transactionHash);

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
      
        // updateBalance(userId);
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

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
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
            {isLoading ? "로딩 중..." : "다음"}
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
            onClick={handleAgreementSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            다음
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">서명하기</h2>
          <p className="text-sm text-gray-600 ml-1 mb-4">마우스를 사용해 서명해주세요.</p>
          <div className="mb-6 mx-1">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 180,
                className: "w-full border border-gray-300 rounded-lg bg-white",
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearSignature}
              className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              서명 초기화
            </button>
            <button
              onClick={handleSignatureSubmit}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "로딩 중..." : "다음"}
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">지갑 비밀번호 입력</h2>
          <div className="mb-4">
            <label htmlFor="walletPassword" className="block text-sm font-medium text-gray-700">
              지갑 비밀번호
            </label>
            <input
              type="password"
              id="walletPassword"
              value={walletPassword}
              onChange={(e) => setWalletPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="비밀번호 입력"
            />
          </div>
          <button
            onClick={handleFinalSubmit}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "로딩 중..." : "투자하기"}
          </button>
        </div>
      )}
    </Modal>
  );
};

export default InvestmentModal;
