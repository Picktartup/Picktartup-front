import React from 'react';

// 툴팁 컴포넌트
export const TooltipTerm = ({ term, description, children }) => {
  return (
    <div className="group relative inline-block">
      <span className="border-b border-dotted border-gray-400 cursor-help">
        {children || term}
      </span>
      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 -mt-1 ml-2 text-sm text-left text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="font-bold mb-1">{term}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

// 용어 설명 데이터
export const terms = {
  MoM: {
    term: "월 성장률(MoM)",
    description: "전월 대비 성장률입니다. 예: 7월 매출이 6월보다 20% 증가했다면 MoM 20%입니다."
  },
  LTV: {
    term: "고객 생애 가치(LTV)",
    description: "한 고객이 서비스를 이용하는 동안 발생시키는 총 수익입니다. 예: 월 1만원 구독 서비스를 평균 12개월 사용하면 LTV는 12만원입니다."
  },
  CAC: {
    term: "고객 획득 비용(CAC)",
    description: "신규 고객 1명을 확보하는데 드는 비용입니다. 예: 마케팅 비용 100만원으로 10명의 신규 고객을 확보했다면 CAC는 10만원입니다."
  },
  MAU: {
    term: "월간 활성 사용자(MAU)",
    description: "한 달 동안 서비스를 실제로 사용한 사용자 수입니다."
  },
  NPS: {
    term: "고객 추천 지수(NPS)",
    description: "서비스 추천 의향을 0~10점으로 평가하여 계산한 고객 만족도 지표입니다."
  },
  TAM: {
    term: "전체 시장 규모(TAM)",
    description: "서비스가 진출할 수 있는 전체 시장의 크기입니다. 예: 국내 이커머스 시장 규모는 약 200조원입니다."
  },
  PMF: {
    term: "제품 시장 적합성(PMF)",
    description: "제품이 시장의 니즈를 잘 충족시키는지 나타내는 지표입니다."
  },
  UNIT_ECONOMICS: {
    term: "단위경제성",
    description: "고객 1명당 발생하는 수익과 비용을 분석한 지표입니다."
  }
};                                      