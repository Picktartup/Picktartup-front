import React from 'react';
import { Globe, MapPin, Calendar, User, Info, TrendingUp, DollarSign, Tag } from 'lucide-react';

// 마침표(`.`) 기준으로 줄바꿈 처리 함수 (처음 3줄 뒤에만 추가 줄바꿈)
const formatDescription = (description) => {
  const sentences = description.split('.').filter((sentence) => sentence.trim());
  
  return sentences.map((sentence, index) => (
    <span key={index}>
      {sentence.trim() + '.'}
      <br />
      {(index === 2) && <br />} {/* 처음 3줄 뒤에만 추가 줄바꿈 */}
    </span>
  ));
};


// Tooltip 컴포넌트 (투자 상태 설명용)
const CustomTooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 w-72 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 -translate-x-1/2 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

// 회사 개요 컴포넌트
const CompanyOverview = ({
  description,
  investmentStatus,
  ceoName,
  address,
  page,
  establishmentDate,
  annualData,
  category,
}) => {
  const latestRevenue = annualData && annualData.length > 0
    ? Math.round(annualData[annualData.length - 1].annual_revenue / 100000000)
    : null;

  return (
    <div className="space-y-8">
      {/* 기업 개요 섹션 */}
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">기업 개요</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          {formatDescription(description)}
        </p>
      </div>

      {/* 세부 정보 카드 섹션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 대표이사 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">대표이사</p>
              <p className="text-lg font-bold text-gray-900">{ceoName}</p>
            </div>
          </div>
        </div>

        

        {/* 홈페이지 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">홈페이지</p>
              <a
                href={page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-gray-900 hover:text-purple-800"
              >
                {page}
              </a>
            </div>
          </div>
        </div>

        {/* 주소 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">주소</p>
              <p className="text-lg font-bold text-gray-900">{address}</p>
            </div>
          </div>
        </div>

        {/* 설립일 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">설립일</p>
              <p className="text-lg font-bold text-gray-900">{establishmentDate}</p>
            </div>
          </div>
        </div>

        {/* 투자 상태 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">투자 상태</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900">{investmentStatus}</p>
                <CustomTooltip
                  content={
                    <div>
                      <p className="font-medium mb-2">투자 상태란?</p>
                      <p className="text-sm mb-3">기업의 현재 자금조달 및 투자 단계를 나타냅니다.</p>
                      <p className="font-medium mb-2">상장/비상장 기업의 차이:</p>
                      <p className="text-sm">상장기업: 증권거래소에 주식이 상장되어 일반 투자자들이 자유롭게 주식을 사고 팔 수 있는 기업</p>
                      <p className="text-sm mt-2">비상장기업: 증권거래소에 상장되지 않은 기업으로, 주식 거래에 제한이 있음</p>
                    </div>
                  }
                >
                  <Info className="w-5 h-5 text-gray-400 cursor-help hover:text-gray-600" />
                </CustomTooltip>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 매출액 */}
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">매출액 (최근 연도)</p>
              <p className="text-lg font-bold text-gray-900">
                {latestRevenue ? `${latestRevenue}억원` : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
