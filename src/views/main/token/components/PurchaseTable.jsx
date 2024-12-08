import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import { FaBitcoin } from "react-icons/fa";
import * as PortOne from "@portone/browser-sdk/v2";
import { toast } from "react-toastify";
import { extractUserIdFromToken, isTokenExpired } from "utils/jwtUtils";

const products = [
  { id: 1, name: "10", price: 1000 },
  { id: 2, name: "30", price: 3000 },
  { id: 3, name: "50", price: 5000 },
  { id: 4, name: "100", price: 10000 },
  { id: 5, name: "200", price: 20000 },
  { id: 6, name: "300", price: 30000 },
  { id: 7, name: "500", price: 50000 },
  { id: 8, name: "700", price: 70000 },
  { id: 9, name: "1000", price: 100000 },
  { id: 10, name: "1500", price: 150000 },
];

const PurchaseTable = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
  
    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Token has expired. Redirecting to login...");
        navigate("/auth/sign-in"); // 로그인 페이지로 리다이렉트
        return;
      }
  
      const decodedUserId = extractUserIdFromToken(token);
      if (decodedUserId) {
        setUserId(decodedUserId.toString()); // userId를 문자열로 변환
        console.log("userId: ", decodedUserId.toString());
      } else {
        console.warn("Invalid userId in token. Redirecting to login...");
        navigate("/auth/sign-in");
      }
    } else {
      console.warn("No token found. Redirecting to login...");
      navigate("/auth/sign-in");
    }
  }, [navigate]);

  async function requestPayment(coin, price) {
    if (!userId || typeof userId !== "string") {
      alert("유효한 사용자 ID를 찾을 수 없습니다.");
      navigate("/auth/sign-in");
      return;
    }

    const paymentId = `payment-${crypto.randomUUID().slice(0, 30)}`;
    const payMethod = "CARD";

    let toastId = null;

    try {
      // Fetch user data from the API
      const userResponse = await fetch(`https://picktartup.com/api/v1/users/public/${userId}/validation`);
      if (!userResponse.ok) {
        alert("사용자 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.");
        return;
      }
  
      const userData = await userResponse.json();
      const { username, email } = userData.data;
  
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
          fullName: username || "테스트유저",
          phoneNumber: "010-8762-6285", // Replace or retrieve dynamically if necessary
          email: email || "example@example.com",
        },
      });
  
      // 결제가 실패한 경우, 오류 메시지를 표시하고 종료
      if (response.code !== undefined) {
        return alert(response.message);
      }
  
      toastId = toast.loading("토큰을 발급 중입니다...", {
        autoClose: false,
        closeOnClick: false,
      });
  
      // 서버에 결제 검증 요청
      const notified = await fetch("https://picktartup.com/api/v1/coins/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        if (toast.isActive(toastId)) {
          toast.update(toastId, {
            render: "토큰이 발급되었습니다!",
            type: "success",
            isLoading: false, // 로딩 상태 해제
            autoClose: 5000,
          });
        } else {
          toast.success("토큰이 발급되었습니다!", { autoClose: 5000 });
        }

        navigate(0);
      } else {
        if (toast.isActive(toastId)) {
          toast.update(toastId, {
            render: "결제 검증에 실패했습니다. 관리자에게 문의해주세요.",
            type: "error",
            isLoading: false, // 로딩 상태 해제
            autoClose: 5000,
          });
        } else {
          toast.error("결제 검증에 실패했습니다. 관리자에게 문의해주세요.", { autoClose: 5000 });
        }
      }
    } catch (error) {
      console.error("결제 처리 중 오류 발생: ", error);

      if (toast.isActive(toastId)) {
        toast.update(toastId, {
          render: "결제 요청 중 오류가 발생했습니다.",
          type: "error",
          isLoading: false, // 로딩 상태 해제
          autoClose: 5000,
        });
      } else {
        toast.error("결제 요청 중 오류가 발생했습니다.", { autoClose: 5000 });
      }
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
