import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Bell,
  SearchIcon,
  CircleIcon,
  HardDrive,
  LayoutDashboard,
  Users,
  Activity,
  Server,
  Settings,
  Shield,
  Database,
  LineChart,
  Network,
  Cpu,
  LogOut,
  RefreshCw,
  Menu as MenuIcon,
  AlertTriangle,
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState('');

  const menuItems = [
    {
      group: '모니터링',
      items: [
        { icon: <LayoutDashboard size={20} />, label: '대시보드', path: '/admin/dashboard' },
        { icon: <Server size={20} />, label: '시스템 모니터링', path: '/admin/system' },
        { icon: <Activity size={20} />, label: '성능 모니터링', path: '/admin/performance' },
        { icon: <Network size={20} />, label: '네트워크 모니터링', path: '/admin/network' },
      ],
    },
    {
      group: '사용자/보안',
      items: [
        { icon: <Users size={20} />, label: '사용자 모니터링', path: '/admin/users' },
        { icon: <Shield size={20} />, label: '보안 모니터링', path: '/admin/security' },
        { icon: <AlertTriangle size={20} />, label: '이상 탐지', path: '/admin/anomaly' },
      ],
    },
    {
      group: '리소스',
      items: [
        { icon: <Database size={20} />, label: 'DB 모니터링', path: '/admin/database' },
        { icon: <Cpu size={20} />, label: '리소스 사용량', path: '/admin/resources' },
        { icon: <LineChart size={20} />, label: '성능 분석', path: '/admin/analytics' },
      ],
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 w-72 h-full bg-[#1a2234] flex flex-col py-6 transition-all duration-300 ease-in-out">
        {/* Logo Area */}
        <div className="px-6 mb-8">
          <div className="flex items-center space-x-3">
            <MenuIcon className="text-white h-6 w-6" />
            <span className="text-white text-xl font-bold">Admin Console</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3">
          {menuItems.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <div className="px-3 mb-2 text-gray-400 text-xs uppercase tracking-wider">
                {group.group}
              </div>
              {group.items.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onMouseEnter={() => setIsHovered(item.path)}
                  onMouseLeave={() => setIsHovered('')}
                  className={`flex items-center px-3 py-3 rounded-lg mb-1 transition-all duration-200 ease-in-out ${
                    location.pathname === item.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-indigo-500/10 hover:text-white'
                  } ${isHovered === item.path ? 'transform scale-[1.02]' : ''}`}
                >
                  <span
                    className={`transition-transform duration-200 ${
                      isHovered === item.path ? 'transform rotate-6' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-3">
          <button
            className="w-full flex items-center px-3 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="ml-3 text-sm font-medium">로그아웃</span>
          </button>
        </div>
      </div>

      <div className="flex-1 ml-28 flex flex-col h-screen">
        <header className="bg-gray-900 h-12 w-full border-b border-gray-700">
          <div className="h-full px-6 flex items-center justify-between">
            {/* 왼쪽 영역 */} 
            <div className="flex items-center space-x-6">
              <button className="p-1 rounded hover:bg-gray-700 flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="text-xs text-gray-300">1분 주기 갱신</span>
              </button>
              <div className="flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs">
                <CircleIcon className="h-2 w-2 mr-1" fill="currentColor" />
                API 정상
              </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-xs text-gray-400">
                <Cpu className="h-4 w-4 mr-2" />
                <span>CPU: 45%</span>
                <HardDrive className="h-4 w-4 mx-4" />
                <span>Memory: 6.2GB</span>
              </div>
              <button className="relative p-1.5 rounded hover:bg-gray-700">
                <Bell className="h-4 w-4 text-gray-400" />
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                  3
                </span>
              </button>
              <button className="p-1.5 rounded hover:bg-gray-700">
                <Settings className="h-4 w-4 text-gray-400" />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="빠른 검색..."
                  className="bg-gray-800 text-sm text-gray-300 px-3 py-1 rounded w-48 focus:outline-none focus:ring-1 focus:ring-gray-700" 
                />
                <SearchIcon className="absolute right-3 top-1.5 h-4 w-4 text-gray-500" />
              </div>
              <div className="text-xs text-gray-400 min-w-[150px]">
                마지막 갱신: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}    
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;