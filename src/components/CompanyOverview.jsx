import React from 'react';
import { User, Globe, MapPin, Calendar, Building2, TrendingUp, Circle, Award } from 'lucide-react';

const StatusBadge = ({ children, type }) => {
 const getStyle = () => {
   const baseStyle = "text-sm font-medium px-4 py-2 rounded-full inline-flex items-center justify-center gap-2 transition-all";
   switch (type) {
     case 'status':
       return `${baseStyle} bg-violet-100 text-violet-800 border border-violet-200 hover:bg-violet-200`;
     case 'investment':
       return `${baseStyle} bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200`;
     default:
       return `${baseStyle} bg-gray-100 text-gray-800 hover:bg-gray-200`;
   }
 };

 // 아이콘 선택
 const getIcon = () => {
   switch (type) {
     case 'status':
       return <Building2 className="w-4 h-4 stroke-[2.5]" />;
     case 'investment':
       return <Award className="w-4 h-4 stroke-[2.5]" />;
     default:
       return <Circle className="w-4 h-4" />;
   }
 };

 return (
   <span className={getStyle()}>
     {getIcon()}
     {children}
   </span>
 );
};

const InfoItem = ({ icon: Icon, label, value, isLink }) => (
 <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all hover:shadow-sm">
   <div className="flex items-center space-x-3">
     <div className="flex-shrink-0 p-2.5 bg-white rounded-lg shadow-sm">
       <Icon className="w-5 h-5 stroke-[1.5] text-gray-700" />
     </div>
     <div className="flex-grow">
       <p className="text-sm text-gray-500 mb-1">{label}</p>
       {isLink ? (
         <a 
           href={value} 
           target="_blank" 
           rel="noopener noreferrer" 
           className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline truncate block"
         >
           {value}
         </a>
       ) : (
         <p className="text-sm font-medium text-gray-900">{value}</p>
       )}
     </div>
   </div>
 </div>
);

const CompanyOverview = ({
 description,
 investmentStatus,
 investmentRound,
 ceoName,
 page,
 address,
 establishmentDate
}) => {
 return (
   <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md">
     <div className="p-6">
       <div className="flex items-center justify-between mb-6">
         <h2 className="text-xl font-bold text-gray-800">기업 개요</h2>
         <div className="flex gap-3">
           <StatusBadge type="status">{investmentStatus}</StatusBadge>
           <StatusBadge type="investment">{investmentRound}</StatusBadge>
         </div>
       </div>
       
       {/* 기업 설명 */}
       <div className="bg-gray-50 rounded-xl p-5 mb-6">
         <p className="text-gray-600 leading-relaxed">
           {description}
         </p>
       </div>

       {/* 상세 정보 그리드 */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <InfoItem 
           icon={User}
           label="대표이사"
           value={ceoName}
         />
         <InfoItem 
           icon={Globe}
           label="홈페이지"
           value={page}
           isLink
         />
         <InfoItem 
           icon={MapPin}
           label="주소"
           value={address}
         />
         <InfoItem 
           icon={Calendar}
           label="설립일"
           value={establishmentDate}
         />
       </div>
     </div>
   </div>
 );
};

export default CompanyOverview;