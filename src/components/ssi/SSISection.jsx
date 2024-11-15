// src/components/SSISection.jsx

import React from 'react';
import SSIIndicator from './SSIIndicator';
import { FaUsers, FaBox, FaChartLine, FaSeedling } from 'react-icons/fa';

const SSISection = () => {
  return (
    <div id="ssi-info" className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">SSI 분석</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SSIIndicator
          title="People"
          description="팀의 역량, 인적 자원, 관리 능력 등을 평가합니다."
          icon={<FaUsers className="text-4xl text-gray-600" />}
        />
        <SSIIndicator
          title="Product"
          description="제품의 품질, 시장성, 기술력 등을 평가합니다."
          icon={<FaBox className="text-4xl text-gray-600" />}
        />
        <SSIIndicator
          title="Performance"
          description="과거 성과, 매출 성장률 및 시장 입지를 평가합니다."
          icon={<FaChartLine className="text-4xl text-gray-600" />}
        />
        <SSIIndicator
          title="Potential"
          description="미래 성장 가능성, 혁신성, 시장 기회 등을 평가합니다."
          icon={<FaSeedling className="text-4xl text-gray-600" />}
        />
      </div>
    </div>
  );
};

export default SSISection;
