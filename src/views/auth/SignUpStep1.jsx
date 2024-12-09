import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authlogo from "assets/img/logo.png";
import Steps from 'components/signup/Steps';
import axios from 'axios';

const TermsModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with blur effect */}
      <div 
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onClick={onClose}
      />
      
      
{/* Modal */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
  <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-2xl">
    {/* Header */}
    <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button
        onClick={onClose}
        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <span className="sr-only">Close</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

          {/* Content */}
          <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 100px)' }}>
            <div className="prose prose-sm max-w-none">
              {/* 이용약관인 경우 */}
              {title === '이용약관' && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">제1장 총칙</h3>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold">제1조 (목적)</h4>
                        <p className="text-gray-600 ml-4">
                          본 약관은 PicktartUp(이하 "회사")이 제공하는 스타트업 조각투자 서비스...
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">제2조 (용어의 정의)</h4>
                        <ul className="ml-4 space-y-2">
                          <li className="text-gray-600">1. "이용자"란 본 서비스를 이용하는 개인, 법인 또는 단체를 의미합니다.</li>
                          <li className="text-gray-600">2. "조각투자"란 스타트업 지분을 PKN 토큰으로 분할하여 투자할 수 있는 서비스를 의미합니다.</li>
                          <li className="text-gray-600">3. "NFT(Non-Fungible Token)"란 회사가 발행하거나 이용자가 등록한 고유한 디지털 자산을 의미합니다.</li>
                          <li className="text-gray-600">4. "PKN 토큰"이란 블록체인 기술을 기반으로 한 회사의 투자 토큰을 의미합니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 개인정보 처리방침인 경우 */}
              {title === '개인정보 처리방침' && (
                <div className="space-y-6">       
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">1. 수집항목</h3>
                      <ul className="ml-4 space-y-2">
                        <li className="text-gray-600">1. 필수항목: 이름, 이메일 주소, 비밀번호, 휴대폰 번호, 계좌정보</li>
                        <li className="text-gray-600">2. 선택항목: 투자 관심 분야, 투자 경험, 직업, 소득수준</li>
                        <li className="text-gray-600">3. 자동수집항목: IP 주소, 접속 로그, 쿠키</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">2. 수집 및 이용목적</h3>
                      <ul className="ml-4 space-y-2">
                        <li className="text-gray-600">1. 서비스 제공 및 계약 이행</li>
                        <li className="text-gray-600">2. NFT 발행 및 거래 내역 관리</li>
                        <li className="text-gray-600">3. 투자 정보 제공 및 스타트업 매칭</li>
                        <li className="text-gray-600">4. 블록체인 지갑 생성 및 관리</li>
                        <li className="text-gray-600">5. 맞춤형 투자 추천 및 분석</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 마케팅 정보 수신 동의인 경우 */}
              {title === '마케팅 정보 수신 동의' && (
                <div className="space-y-6">      
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">1. 수신 정보 내용</h3>
                      <ul className="ml-4 space-y-2">
                        <li className="text-gray-600">1. 신규 투자 상품 및 NFT 발행 정보</li>
                        <li className="text-gray-600">2. 투자 시장 동향 및 데이터 리포트</li>
                        <li className="text-gray-600">3. 이벤트, 프로모션 및 경품 정보</li>
                        <li className="text-gray-600">4. PicktartUp의 기술 및 서비스 업데이트 소식</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">2. 수신 방법</h3>
                      <ul className="ml-4 space-y-2">
                        <li className="text-gray-600">1. 이메일</li>
                        <li className="text-gray-600">2. 문자메시지</li>
                        <li className="text-gray-600">3. 앱 푸시 알림</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">3. 마케팅 정보 활용 목적</h3>
                      <ul className="ml-4 space-y-2">
                        <li className="text-gray-600">1. 이용자 관심사에 맞춘 맞춤형 투자 정보 제공</li>
                        <li className="text-gray-600">2. NFT 신규 발행 및 추천</li>
                        <li className="text-gray-600">3. PKN 토큰 활용 캠페인 및 혜택 안내</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SignUpStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: ''
  });

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false
  });

  const termsContent = {
    terms: `제1장 총칙
  
    제1조 (목적)
    본 약관은 PicktartUp(이하 "회사")이 제공하는 스타트업 조각투자 서비스, NFT 발행 및 거래 플랫폼, PKN 토큰 기반 투자 서비스와 관련하여 이용자와 회사 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
    
    제2조 (용어의 정의)
    1. "이용자"란 본 서비스를 이용하는 개인, 법인 또는 단체를 의미합니다.
    2. "조각투자"란 스타트업 지분을 PKN 토큰으로 분할하여 투자할 수 있는 서비스를 의미합니다.
    3. "NFT(Non-Fungible Token)"란 회사가 발행하거나 이용자가 등록한 고유한 디지털 자산을 의미합니다.
    4. "PKN 토큰"이란 블록체인 기술을 기반으로 한 회사의 투자 토큰을 의미합니다.
    
    제3조 (투자 위험 고지)
    1. 투자자는 스타트업 조각투자와 NFT 거래에 따른 원금 손실 등 투자위험이 있음을 이해하고, 회사는 투자손실에 대한 책임을 지지 않습니다.
    2. NFT는 법적 소유권을 보장하지 않으며, 디지털 자산에 대한 소유 및 거래만을 목적으로 합니다.
    
    제4조 (서비스 이용)
    1. 회사는 이용자에게 다음과 같은 서비스를 제공합니다.
      - 스타트업 조각투자 및 PKN 토큰 관리
      - NFT 발행 및 거래
      - 투자 데이터 분석 및 보고
    2. 서비스 이용 중 이용자의 책임 있는 사유로 발생한 손해는 회사가 책임지지 않습니다.
    
    제5조 (이용자의 의무)
    1. 이용자는 본 서비스 이용 시 법령 및 약관을 준수하여야 합니다.
    2. 허위 정보를 제공하거나, 서비스 운영을 방해하는 행위를 해서는 안 됩니다.
    3. 블록체인 지갑의 개인 키 및 비밀번호 관리는 이용자 본인의 책임입니다.
      `,
      privacy: `개인정보 수집 및 이용 동의
    
    1. 수집항목
    - 필수항목: 이름, 이메일 주소, 비밀번호, 휴대폰 번호, 계좌정보
    - 선택항목: 투자 관심 분야, NFT 거래 이력, 직업, 소득수준
    - 자동수집항목: IP 주소, 접속 로그, 블록체인 지갑 주소
    
    2. 수집 및 이용목적
    - 서비스 제공 및 계약 이행
    - NFT 발행 및 거래 내역 관리
    - 투자 정보 제공 및 스타트업 매칭
    - 블록체인 지갑 생성 및 관리
    - 맞춤형 투자 추천 및 분석
    
    3. 보유 및 이용기간
    회원 탈퇴 시까지 (관계 법령에 따라 보존할 필요가 있는 경우 해당 기간까지)
    `,
      marketing: `마케팅 정보 수신 동의
    
    1. 수신 정보 내용
    - 신규 투자 상품 및 NFT 발행 정보
    - 투자 시장 동향 및 데이터 리포트
    - 이벤트, 프로모션 및 경품 정보
    - PicktartUp의 기술 및 서비스 업데이트 소식
    
    2. 수신 방법
    - 이메일
    - 문자메시지
    - 앱 푸시 알림 
    
    3. 마케팅 정보 활용 목적
    - 이용자 관심사에 맞춘 맞춤형 투자 정보 제공
    - NFT 신규 발행 및 추천
    - PKN 토큰 활용 캠페인 및 혜택 안내
    `
    };
  
  const handleModalOpen = (type) => {
    setModalState({
      isOpen: true,
      title: type === 'terms' ? '이용약관' : 
             type === 'privacy' ? '개인정보 처리방침' : '마케팅 정보 수신 동의',
      content: termsContent[type]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'all') {
      setAgreements({
        all: checked,
        terms: checked,
        privacy: checked,
        marketing: checked
      });
    } else {
      const newAgreements = {
        ...agreements,
        [name]: checked
      };
      setAgreements({
        ...newAgreements,
        all: newAgreements.terms && newAgreements.privacy && newAgreements.marketing
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 중복 제출 방지
    if (isSubmitting) return;

    // 비밀번호 확인
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 필수 약관 동의 확인
    if (!agreements.terms || !agreements.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    const requestData = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    try {
      setIsSubmitting(true); // 제출 시작

      // 회원가입 API 호출
      const response = await axios.post('https://picktartup.com/api/v1/users/public/register', requestData);

      if (response.data.success) {
        // 회원가입 성공 시 다음 단계로 이동
        navigate('/auth/signup/step2', {
          state: {
            formData,
            userId: response.data.data // 서버로부터 받은 userId 전달
          }
        });
      } else {
        throw new Error('회원가입 실패'); // 성공 여부에 따른 추가 처리
      }
    } catch (error) {
      console.error('Register error:', error);

      // 서버에서 보내준 에러 메시지 또는 기본 메시지
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false); // 제출 완료
    }
  };


  return (
    <div className="flex min-h-screen flex-col items-center pt-10 px-4">
      <div className="text-center mb-6">
        <img
          src={authlogo}
          alt="PicktartUp"
          className="mx-auto h-14 w-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          이메일로 회원가입
        </h2>
        <p className="text-sm text-gray-500">
          스타트업 투자의 시작, PicktartUp
        </p>
      </div>

      <Steps currentStep={1} />

      <div className="w-full max-w-[400px]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="example@picktartup.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              required
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="all"
                checked={agreements.all}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                전체 동의
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreements.terms}
                  onChange={handleCheckboxChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  이용약관 동의 (필수)
                </label>
              </div>
              <button
                type="button"
                onClick={() => handleModalOpen('terms')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                전문보기
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={agreements.privacy}
                  onChange={handleCheckboxChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  개인정보 수집・이용 동의 (필수)
                </label>
              </div>
              <button
                type="button"
                onClick={() => handleModalOpen('privacy')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                전문보기
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={agreements.marketing}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  마케팅 정보 수신 동의 (선택)
                </label>
              </div>
              <button
                type="button"
                onClick={() => handleModalOpen('marketing')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                전문보기
              </button>
            </div>
          </div>

          <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '처리중...' : '다음 단계'}
        </button>
        </form>
      </div>

      <TermsModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({...modalState, isOpen: false})}
        title={modalState.title}
        content={modalState.content}
      />
    </div>
  );
};

export default SignUpStep1;