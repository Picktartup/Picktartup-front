import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/main";
import AuthLayout from "layouts/auth";
import AdminPageLayout from "layouts/admin";
import DetailPage from "./views/main/default/details";
import Dashboard from "./views/admin/Dashboard";
import SystemMonitoring from "./views/admin/SystemMonitoring";
import PerformanceMonitoring from "./views/admin/PerformanceMonitoring";
import NetworkMonitoring from "./views/admin/NetworkMonitoring";
import UserMonitoring from "./views/admin/UserMonitoring"; // 추가

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
       <Route path="admin" element={<AdminPageLayout />}>
         <Route path="dashboard" element={<Dashboard />} />
         <Route path="system" element={<SystemMonitoring />} />
         <Route path="performance" element={<PerformanceMonitoring />} />
         <Route path="network" element={<NetworkMonitoring />} />
         <Route path="users" element={<UserMonitoring />} /> {/* 추가된 Route */}
       </Route>
       <Route path="rtl/*" element={<RtlLayout />} />
       <Route path="/main/default/details/:startupId" element={<DetailPage />} />
       <Route path="/" element={<Navigate to="/main" replace />} />
     </Routes>
   </>
 );
};

export default App;