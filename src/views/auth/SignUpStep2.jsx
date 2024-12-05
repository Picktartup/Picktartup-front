import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WalletSuccessDialog from 'components/signup/WalletSuccessDialog';
import authlogo from "assets/img/logo.png";
import Steps from 'components/signup/Steps';
import axios from 'axios';

const SignUpStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [walletData, setWalletData] = useState(null);

  const handleCreateWallet = async () => {
    setIsCreatingWallet(true);
    
    try {
      const response = await axios.post('https://192.168.0.142:31158/wallet/api/v1/wallets', {
        userId: userId
      });

      if (response.data.success) {
        setWalletData(response.data.data);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error('Wallet creation failed:', error);
      if (error.response) {
        alert(error.response.data.message || '지갑 생성에 실패했습니다. 다시 시도해주세요.');
      } else {
        alert('서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsCreatingWallet(false);
    }
  };

  if (!userId) {
    alert('사용자 ID가 제공되지 않았습니다.');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center pt-10 px-4">
      <div className="text-center mb-6">
        <img
          src={authlogo}
          alt="PicktartUp"
          className="mx-auto h-14 w-auto mb-4"
        />
      </div>

      <Steps currentStep={2} />

      <div className="w-full max-w-[400px] text-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            토큰 지갑 생성
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            PKN 토큰을 안전하게 보관하고 관리할 수 있는 지갑을 생성합니다.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                • 지갑 생성 후에는 수정이 불가능합니다
              </p>
              <p className="text-sm text-gray-600">
                • 생성된 지갑 주소는 마이페이지에서 확인할 수 있습니다
              </p>
              <p className="text-sm text-gray-600">
                • 개인키는 안전하게 보관됩니다
              </p>
            </div>
            <button
              onClick={handleCreateWallet}
              disabled={isCreatingWallet}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isCreatingWallet ? '지갑 생성 중...' : '지갑 생성하기'}
            </button>
          </div>
        </div>
      </div>
      {showSuccessDialog && walletData && (
        <WalletSuccessDialog walletData={walletData} />
      )}
    </div>
  );
};

export default SignUpStep2;