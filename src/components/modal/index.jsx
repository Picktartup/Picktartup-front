import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, size = "md" }) => {
  // 사이즈 클래스 정의
  const sizeClass = {
    sm: "max-w-sm", // 작은 모달
    md: "max-w-md", // 기본 모달
    lg: "max-w-4xl", // 큰 모달 (계약서 보기)
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
    } else {
      document.body.style.overflow = ""; // 초기 상태로 복원
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose(); // ESC 키로 닫기
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 초기화
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 모달 콘텐츠 */}
      <div
        className={`relative bg-white rounded-lg w-11/12 ${sizeClass[size]} p-6 
                   transform scale-100 transition-transform duration-200 ease-out shadow-xl`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 중단
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 모달 내용 */}
        {children}
      </div>
    </div>
  );
};

export default Modal;