import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import { FaBitcoin } from "react-icons/fa";
import * as PortOne from "@portone/browser-sdk/v2";
import { extractUserIdFromToken, isTokenExpired } from "utils/jwtUtils";

const products = [
  { id: 1, name: "1", price: 100 },
  { id: 2, name: "10", price: 1000 },
  { id: 3, name: "30", price: 3000 },
  { id: 4, name: "50", price: 5000 },
  { id: 5, name: "100", price: 10000 },
  { id: 6, name: "200", price: 20000 },
  { id: 7, name: "300", price: 30000 },
  { id: 8, name: "500", price: 50000 },
  { id: 9, name: "700", price: 70000 },
  { id: 10, name: "1000", price: 100000 },
];

const PurchaseTable = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Token has expired. Redirecting to login...");
        navigate("/login"); // 로그인 페이지로 리다이렉트
        return;
      }

      const decodedUserId = extractUserIdFromToken(token);
      setUserId(decodedUserId);
      console.log("userId: ", userId);

      // 전역 Axios 요청에 Authorization 헤더 추가
      // fetch.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found. Redirecting to login...");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  async function requestPayment(coin, price) {
    const paymentId = `payment-${crypto.randomUUID().slice(0, 30)}`;
    const payMethod = "CARD";

    // PortOne에 결제 요청
    const response = await PortOne.requestPayment({
      storeId: process.env.REACT_APP_STORE_ID,
      channelKey: process.env.REACT_APP_CHANNEL_KEY,
      paymentId: paymentId,
      orderName: "PCK",
      totalAmount: price, // 선택한 결제 금액
      currency: "CURRENCY_KRW",
      payMethod: payMethod,
      customer: {
        customerId: userId, // JWT에서 추출한 userId 사용
        fullName: "테스트유저",
        phoneNumber: "010-1234-5678",
        email: "yummytomato7@gmail.com",
      },
    });

    // 결제가 실패한 경우, 오류 메시지를 표시하고 종료
    if (response.code !== undefined) {
      return alert(response.message);
    }

    // 결제 성공 알림 표시
    alert("결제가 성공적으로 완료되었습니다!");

    // 서버에 결제 검증 요청
    const notified = await fetch("https://picktartup.com/coins/api/v1/coins/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 헤더에 JWT 추가
      },
      body: JSON.stringify({
        userId: userId, // JWT에서 추출한 userId 사용
        amount: price,
        coin: Number(coin),
        paymentId: paymentId,
        paymentMethod: payMethod,
      }),
    });

    console.log(notified);

    // 서버 검증 성공 시 새로 고침
    if (notified.ok) {
      navigate(0);
    } else {
      alert("결제 검증에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <Card extra="bg-white !flex-row flex items-center justify-center rounded-[20px] pt-2 pb-6 lg:px-12 md:px-8 sm:px-6 py-2">
      <div className="max-w-5xl w-full mx-auto">
        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 whitespace-nowrap">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm w-full"
            >
              <div className="flex items-center space-x-2 pr-4">
                <FaBitcoin className="text-yellow-400 mr-1" />
                <span className="text-[16px] font-medium">
                  {product.name} <span className="pl-1">PCK</span>
                </span>
              </div>
              <button
                onClick={() => requestPayment(product.name, product.price)}
                className="text-[16px] bg-violet-600 text-white px-3 py-1 rounded-lg w-24 text-center"
              >
                {product.price.toLocaleString()}원
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PurchaseTable;
