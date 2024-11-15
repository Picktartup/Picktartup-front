import React from "react";

// Main Imports
import MainDashboard from "views/main/default";
import NFTMarketplace from "views/main/investment";
import Profile from "views/main/history";
import ContractDetail from "views/main/history/ContractDetail";
import DataTables from "views/main/token";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

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
];
export default routes;
