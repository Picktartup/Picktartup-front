import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import { FaBitcoin } from "react-icons/fa";
import * as PortOne from "@portone/browser-sdk/v2";

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
  const navigate = useNavigate();

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
      customer: {          // TODO: 로그인한 유저 정보로 수정
        customerId: 'testId1234',
        fullName: '테스트유저',
        phoneNumber: '010-1234-5678',
        email: 'yummytomato7@gmail.com',
      },
    }); // 응답 - (공통) paymentId: 결제 건 ID, (실패 시) code: 오류 코드, message: 오류 문구
    

    // 결제가 실패한 경우, 오류 메시지를 표시하고 종료
    if (response.code !== undefined) {
      return alert(response.message);
    }

    // 결제 성공 알림 표시
    alert("결제가 성공적으로 완료되었습니다!");


    // 서버에 결제 검증 요청
    const notified = await fetch("/api/v1/coins/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // paymentId와 주문 정보를 서버에 전달합니다
      body: JSON.stringify({
        walletId: 1,          // TODO: 로그인한 유저 정보로 수정
        amount: price,
        coin: Number(coin),
        paymentId: paymentId,
        paymentMethod: payMethod,
      }),
    });
    
    console.log(notified);
    console.log(notified.json());

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
          {products.map(product => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm w-full"
            >
              <div className="flex items-center space-x-2 pr-4">
                <FaBitcoin className="text-yellow-400 mr-1" />
                <span className="text-[16px] font-medium">{product.name} <span className="pl-1">PCK</span></span>
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
