import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardIcon, CheckCircle } from 'lucide-react';

const WalletSuccessDialog = ({ walletData }) => {
  const navigate = useNavigate();
  
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleContinue = () => {
    navigate('/auth/sign-in');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
          지갑 생성 완료
        </h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <p className="text-yellow-700 font-medium text-sm">
              ⚠️ 아래 정보를 반드시 안전한 곳에 보관하세요
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <h3 className="text-base font-semibold text-blue-900 mb-2">임시 비밀번호</h3>
            <div className="flex items-center justify-between bg-white p-3 rounded border border-blue-200">
              <p className="text-lg font-mono text-blue-900">{walletData.temporaryPassword}</p>
              <button
                onClick={() => handleCopyToClipboard(walletData.temporaryPassword)}
                className="p-1.5 hover:bg-blue-50 rounded-full"
              >
                <ClipboardIcon className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded">
            <h3 className="text-base font-semibold text-gray-700 mb-2">지갑 주소</h3>
            <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
              <p className="text-sm font-mono text-gray-600 break-all">{walletData.address}</p>
              <button
                onClick={() => handleCopyToClipboard(walletData.address)}
                className="p-1.5 hover:bg-gray-50 rounded-full ml-2"
              >
                <ClipboardIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded text-sm text-gray-600">
            <ul className="space-y-2">
              <li>• 임시 비밀번호는 최초 1회만 제공됩니다</li>
              <li>• 지갑 주소는 마이페이지에서 확인 가능합니다</li>
              <li>• 키스토어 파일이 안전하게 저장되었습니다</li>
            </ul>
          </div>

          <button
            onClick={handleContinue}
            className="w-full py-3 px-4 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 text-sm mt-2"
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletSuccessDialog;