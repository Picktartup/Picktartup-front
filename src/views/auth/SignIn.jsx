// src/views/auth/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authlogo from "assets/img/logo.png";
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://picktartup.com/api/v1/users/public/login', {
        email,
        password
      });

      if (response.data.success && response.data.code === 200) {
        const { role, tokenType, accessToken, refreshToken, accessTokenExpireDate } = response.data.data;
        
        // 토큰 정보 저장
        localStorage.setItem('role', role);
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessTokenExpireDate', accessTokenExpireDate);
        
        // axios 기본 헤더 설정
        axios.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`;
      
        // 권한에 따른 리다이렉트
        if (role === 'ADMIN') {
          navigate('/admin/dashboard'); // 관리자 페이지로 리다이렉트
        } else {
          navigate('/main/default'); // 일반 사용자는 홈으로 리다이렉트
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        alert(error.response.data.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      } else {
        alert('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Logo and Title */}
      <div className="text-center mb-6 max-w-[400px]">
        <img
          src={authlogo}
          alt="PicktartUp"
          className="mx-auto h-24 w-auto mb-4"
        />
        <h2 className="text-xl font-extrabold text-gray-900 mb-1">
          로그인하고 나만의 스타트업에 투자해보세요
        </h2>
        <p className="text-sm text-gray-500">
          PKN 토큰으로 투명하고 안전하게 스타트업에 투자하세요
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-[360px] mb-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-black-700 mb-1"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@picktartup.com"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="remember-me" 
                className="ml-2 text-sm text-black-600"
              >
                로그인 유지
              </label>
            </div>
            <div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                아이디・비밀번호 찾기
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">아직 아이디가 없으신가요? </span>
          <Link 
            to="/auth/signup/step1" 
            className="text-indigo-700 hover:text-indigo-500"
          >
            회원가입
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[920px] px-4">
        <div className="text-center">
          <div className="text-indigo-500 flex justify-center mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-gray-900">토큰 기반 투자</h3>
          <p className="mt-1 text-sm text-gray-600">
            블록체인 기술로 구현된 토큰으로 소액부터 투자가 가능합니다.
          </p>
        </div>
        <div className="text-center">
          <div className="text-indigo-500 flex justify-center mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-gray-900">투명한 거래</h3>
          <p className="mt-1 text-sm text-gray-600">
            모든 거래 내역이 블록체인에 기록되어 투명하게 관리됩니다.
          </p>
        </div>
        <div className="text-center">
          <div className="text-indigo-500 flex justify-center mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-gray-900">안전한 보관</h3>
          <p className="mt-1 text-sm text-gray-600">
            디지털 자산을 안전하게 보관하고 관리할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;