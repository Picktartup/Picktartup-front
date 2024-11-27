import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // react-toastify CSS import

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/main";
import AuthLayout from "layouts/auth";
import DetailPage from "./views/main/default/details"; // DetailPage import


const App = () => {
  return (
    <>
      <ToastContainer 
        position="bottom-right"
        hideProgressBar={false}
        toastClassName={({ type }) =>
          type === "success"
            ? "relative bg-green-900 opacity-80	text-white text-sm font-semibold rounded-lg shadow-lg p-4 ml-2 overflow-hidden"
            : type === "error"
            ? "relative bg-red-900 opacity-80	text-white text-sm font-semibold rounded-lg shadow-lg p-4 ml-2 overflow-hidden"
            : "relative bg-gray-900 opacity-80	text-white text-sm font-semibold rounded-lg shadow-lg p-4 ml-2 overflow-hidden"
        }
      />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="main/*" element={<AdminLayout />} />
        <Route path="rtl/*" element={<RtlLayout />} />
        {/* 기업 이름을 기반으로 하는 상세 페이지 경로 추가 */}
        <Route path="/main/default/details/:startupId" element={<DetailPage />} />
        <Route path="/" element={<Navigate to="/main" replace />} />
      </Routes>
    </>
  );
};

export default App;
