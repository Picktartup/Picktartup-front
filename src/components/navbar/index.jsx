import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import logo from "assets/img/logo.png";

const Navbar = (props) => {
  const { brandText } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900 h-12 w-full border-b border-gray-700 flex items-center justify-between"
      >
        {/* Logo and Menu */}
        <div className="flex items-center space-x-6">
          <Link
            to="/main"
            className="flex items-center space-x-2 font-sbaggrob font-bold hover:text-navy-700 dark:hover:text-white px-4"
          >
            <img className="h-8 w-8" src={logo} alt="logo" />
            <p className="text-lg font-medium text-gray-200 dark:text-white">PicktartUp</p>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold capitalize hover:text-gray-700 dark:hover:text-white ${
                  brandText === item.text ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex items-center space-x-3">
          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button className="mr-4 bg-navy-600 text-white px-4 py-2 rounded-lg hover:text-gray-200 text-sm font-semibold">
              <Link to="/auth/sign-in" className="font-semibold">
                로그인
              </Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <RiMenuLine className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
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
                <span className="text-lg font-bold text-navy-700 dark:text-white">
                  PicktartUp
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <RiCloseLine className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-bold text-sm ${
                    brandText === item.text
                      ? "bg-navy-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={toggleSidebar}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Section with Login Button */}
          <div className="mt-auto mb-2 p-4 border-t border-gray-700">
            <Link to="/auth/sign-in" onClick={toggleSidebar}>
              <button className="w-full bg-navy-600 text-white px-4 py-3 rounded-lg hover:text-gray-200 text-sm font-semibold">
                로그인
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
