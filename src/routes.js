import React from "react";
import MainDashboard from "views/main/default";
import NFTMarketplace from "views/main/investment";
import Profile from "views/main/history";
import ContractDetail from "views/main/history/ContractDetail";
import DataTables from "views/main/token";
import DetailPage from "views/main/default/details";
import SignIn from "views/auth/SignIn";
import SignUpStep1 from "views/auth/SignUpStep1";
import SignUpStep2 from "views/auth/SignUpStep2";

// Admin Imports
import Dashboard from 'views/admin/Dashboard';
import SystemMonitoring from 'views/admin/SystemMonitoring';
import PerformanceMonitoring from 'views/admin/PerformanceMonitoring';
import NetworkMonitoring from 'views/admin/NetworkMonitoring';
import UserMonitoring from 'views/admin/UserMonitoring';

// Icon Imports
import { 
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdPersonAdd,
} from "react-icons/md";

import {
  LayoutDashboard,
  Server,
  Activity,
  Network,
  Users,
  Shield,
  AlertTriangle,
  Database,
  Cpu,
  LineChart
} from 'lucide-react';

const routes = [
  {
    name: "",
    layout: "/main",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "스타트업 투자",
    layout: "/main",
    path: "investment",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "DetailPage",
    layout: "/main",
    path: "default/details/:startupId",
    component: <DetailPage />,
  },
  {
    name: "My 토큰",
    layout: "/main",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "token",
    component: <DataTables />,
  },
  {
    name: "투자 내역",
    layout: "/main",
    path: "history",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "투자 상세 내역",
    layout: "/main",
    path: "history/:id",
    component: <ContractDetail />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Sign Up Step 1",
    layout: "/auth",
    path: "signup/step1",
    icon: <MdPersonAdd className="h-6 w-6" />,
    component: <SignUpStep1 />,
  },
  {
    name: "Sign Up Step 2",
    layout: "/auth",
    path: "signup/step2",
    icon: <MdPersonAdd className="h-6 w-6" />,
    component: <SignUpStep2 />,
  },
  // Admin Routes
  {
    name: "관리자 대시보드",
    layout: "/admin",
    path: "dashboard",
    icon: <LayoutDashboard size={20} />,
    component: <Dashboard />
  },
  {
    name: "시스템 모니터링",
    layout: "/admin",
    path: "system",
    icon: <Server size={20} />,
    component: <SystemMonitoring />,
  },
  {
    name: "성능 모니터링",
    layout: "/admin",
    path: "performance",
    icon: <Activity size={20} />,
    component: <PerformanceMonitoring />,
  },
  {
    name: "네트워크 모니터링",
    layout: "/admin",
    path: "network",
    icon: <Network size={20} />,
    component: <NetworkMonitoring />,
  },
  {
    name: "사용자 모니터링",
    layout: "/admin",
    path: "users",
    icon: <Users size={20} />,
    component: <UserMonitoring />,
  }
];

export default routes;