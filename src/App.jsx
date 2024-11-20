import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/main";
import AuthLayout from "layouts/auth";
import DetailPage from "./views/main/default/details"; // DetailPage import
const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="main/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      {/* 기업 이름을 기반으로 하는 상세 페이지 경로 추가 */}
      <Route path="/main/default/details/:startupId" element={<DetailPage />} />
      <Route path="/" element={<Navigate to="/main" replace />} />
    </Routes>
  );
};

export default App;
