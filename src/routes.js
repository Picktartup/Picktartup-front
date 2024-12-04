import React from "react";

// Main Imports
import MainDashboard from "views/main/default";
import NFTMarketplace from "views/main/manage";
import Profile from "views/main/history";
import DataTables from "views/main/monitoring";
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
import StartupInvestment from "views/main/manage";

const routes = [
  {
    name: "",
    layout: "/main",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "스타트업 관리",
    layout: "/main",
    path: "manage",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <StartupInvestment />,
    secondary: true,
  },
  {
    name: "모니터링",
    layout: "/main",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "monitoring",
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
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
