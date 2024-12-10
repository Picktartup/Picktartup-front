import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import logo from "assets/img/logo.png";
import { isTokenExpired } from "utils/jwtUtils";
import axios from "axios";

const Navbar = (props) => {
  const { brandText } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("토큰이 없습니다. 로그아웃이 취소되었습니다.");
      return;
    }

    try {
      await axios.delete('https://picktartup.com/api/v1/users/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("accessToken"); // 토큰 제거
      setIsLoggedIn(false); // 상태 업데이트
      navigate('/main/default'); // 페이지 이동
    } catch (error) {
      console.error('로그아웃 실패:', error.response?.data || error.message);
    }
  };

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { path: "/main/investment", text: "스타트업 투자" },
    { path: "/main/token", text: "My 토큰" },
    { path: "/main/history", text: "투자 내역" },
  ];

  return (
    <>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Navbar */}
      <nav className="sticky top-4 z-40 flex items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
        {/* Logo and Desktop Menu */}
        <div className="flex items-center">
          <Link
            to="/main"
            className="flex items-center space-x-2 font-sbaggrob font-bold hover:text-navy-700 dark:hover:text-white"
          >
            <img className="h-10 w-10" src={logo} alt="logo" />
            <p className="text-[22px] text-navy-700 dark:text-white hidden md:inline pr-4">
              PicktartUp
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 whitespace-nowrap ml-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[16px] font-bold capitalize hover:text-navy-700 dark:hover:text-white ${
                  brandText === item.text ? "text-navy-700" : "text-[#7885ad]"
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex items-center space-x-4">
          {/* Desktop Login Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 text-[14px] whitespace-nowrap"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/auth/sign-in"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 text-[14px] whitespace-nowrap font-semibold"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <RiMenuLine className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-navy-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        {/* Sidebar Content Container */}
        <div className="flex flex-col h-full">
          {/* Top Section */}
          <div className="p-4">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-6 p-2">
              <Link to="/main" className="font-tenada flex items-center space-x-2">
                <span className="text-xl font-bold text-navy-700 dark:text-white">
                  PicktartUp
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <RiCloseLine className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-bold text-[15px] ${
                    brandText === item.text
                      ? "bg-navy-700 text-white"
                      : "text-[#7885ad] hover:bg-gray-100 dark:hover:bg-navy-700/50"
                  }`}
                  onClick={toggleSidebar}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section with Login Button */}
          <div className="mt-auto mb-2 p-4 border-t border-gray-200 dark:border-navy-700">
            {isLoggedIn ? (
              <button
                className="w-full bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 text-[14px] font-semibold"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <Link to="/auth/sign-in" onClick={toggleSidebar}>
                <button className="w-full bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 text-[14px] font-semibold">
                  로그인
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
