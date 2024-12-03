import React, { useState } from "react";
import axios from "axios";

const ExchangeTable = ({ balance }) => {
  const userId = 3;

  const [exchangeAmount, setExchangeAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [exchangeError, setExchangeError] = useState(null);
  const [exchangeBankError, setExchangeBankError] = useState(null);
  const [accountNumberError, setAccountNumberError] = useState(null);

  const handleExchangeRequest = async () => {
    let valid = true;
    setExchangeError(null);
    setExchangeBankError(null);
    setAccountNumberError(null);

    if (!exchangeAmount) {
      setExchangeError("환전할 토큰 수량을 입력해 주세요.");
      valid = false;
    }
    if (!selectedBank) {
      setExchangeBankError("은행을 선택해 주세요.");
      valid = false;
    }
    if (!accountNumber) {
      setAccountNumberError("계좌 번호를 입력해 주세요.");
      valid = false;
    }
    if (exchangeAmount > balance) {
      setExchangeError("보유한 토큰보다 많은 양을 입력했습니다. 보유 토큰 내에서 입력해 주세요.");
      valid = false;
    }

    if (!valid) return; // 유효성 검사 실패 시 요청 진행 안 함

    try {
      const response = await axios.post("/api/v1/coins/exchange", {
        userId: userId,
        exchangeAmount: Number(exchangeAmount),
        exchangeBank: selectedBank,
        exchangeAccount: accountNumber,
      });
      alert("환전 요청이 완료되었습니다.");
      setExchangeAmount("");
      setSelectedBank("");
      setAccountNumber("");
    } catch (error) {
      setExchangeError("환전 요청에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="pt-2 px-6 bg-white rounded-lg mx-2 md:mx-10vw">
      <h2 className="text-xl font-semibold mb-4">보유 토큰 현금화</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          현금화 신청 수량
        </label>
        <input
          type="number"
          value={exchangeAmount}
          onChange={(e) => setExchangeAmount(e.target.value)}
          placeholder="환전할 토큰 수량 입력"
          className="mt-1 p-2 block w-full border rounded-md"
        />
        {exchangeError && <p className="text-red-500 mt-1 text-sm">{exchangeError}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          은행 선택
        </label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        >
          <option value="">은행을 선택해 주세요</option>
          <option value="우리은행">우리은행</option>
          <option value="KB국민은행">KB국민은행</option>
          <option value="신한은행">신한은행</option>
          <option value="하나은행">하나은행</option>
          <option value="NH농협은행">NH농협은행</option>
        </select>
        {exchangeBankError && <p className="text-red-500 mt-1 text-sm">{exchangeBankError}</p>}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          계좌번호
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="계좌 번호 입력"
          className="mt-1 p-2 block w-full border rounded-md"
        />
        {accountNumberError && <p className="text-red-500 mt-1 text-sm">{accountNumberError}</p>}
      </div>
      <button
        onClick={handleExchangeRequest}
        className="w-full mb-6 py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-violet-700"
      >
        환전 요청
      </button>
    </div>
  );
};

export default ExchangeTable;
