import React, { useState } from 'react';
import { Globe, MapPin, Calendar, User, Info, TrendingUp, DollarSign, Tag } from 'lucide-react';

const CustomTooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block"
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className="absolute z-50 w-72 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 -translate-x-1/2 left-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

const CompanyOverview = ({ 
  description, 
  investmentStatus, 
  ceoName, 
  address, 
  page, 
  establishmentDate, 
  annualData,
  category  // 카테고리 prop 추가
}) => {
  const latestRevenue = annualData && annualData.length > 0 
    ? Math.round(annualData[annualData.length - 1].annual_revenue / 100000000)
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">기업 개요</h2>
        </div>

        <p className="text-gray-700 text-lg mb-8 leading-relaxed">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">대표이사</p>
                <p className="text-lg font-bold text-gray-900">{ceoName}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">카테고리</p>
                <p className="text-lg font-bold text-gray-900">{category}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">홈페이지</p>
                <a href={page} target="_blank" rel="noopener noreferrer" 
                   className="text-lg font-bold text-blue-600 hover:text-blue-800">
                  {page}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">주소</p>
                <p className="text-lg font-bold text-gray-900">{address}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">설립일</p>
                <p className="text-lg font-bold text-gray-900">{establishmentDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <TrendingUp className="w-6 h-6 text-blue-600" />
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

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">매출액 (최근 연도)</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-gray-900">
                    {latestRevenue ? `${latestRevenue}억원` : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;