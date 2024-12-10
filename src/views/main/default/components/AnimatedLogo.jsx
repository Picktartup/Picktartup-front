// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import axios from "axios";
// import { TrendingUp, ArrowRight } from "lucide-react";
// import SimpleStats from "components/SimpleStats";
// import defaultImage from "assets/img/nfts/default.png";
// import { useNavigate } from "react-router-dom";
// import NftCard from "components/card/NftCard";
// import TokenInvestmentProcess from "components/TokenInvestmentProcess";
// import MainVideo from "components/MainVideo";
// import logoImage from "assets/img/logo.png";

// // 로고 애니메이션 컴포넌트
// const LogoAnimation = () => {
//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center bg-white z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* 가로선들 */}
//       <motion.div
//         className="absolute top-[25%] w-full h-[1px] bg-gray-200"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />
//       <motion.div
//         className="absolute top-[50%] w-full h-[1px] bg-gray-200"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />
//       <motion.div
//         className="absolute top-[75%] w-full h-[1px] bg-gray-200"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />

//       {/* 세로선들 */}
//       <motion.div
//         className="absolute left-[25%] h-full w-[1px] bg-gray-200"
//         initial={{ height: 0 }}
//         animate={{ height: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />
//       <motion.div
//         className="absolute left-[50%] h-full w-[1px] bg-gray-200"
//         initial={{ height: 0 }}
//         animate={{ height: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />
//       <motion.div
//         className="absolute left-[75%] h-full w-[1px] bg-gray-200"
//         initial={{ height: 0 }}
//         animate={{ height: "100%" }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       />

//       {/* 로고 */}
//       <motion.div
//         className="relative"
//         initial={{ scale: 2, opacity: 0 }}
//         animate={{ 
//           scale: [2, 0.8, 1],
//           opacity: 1
//         }}
//         transition={{ 
//           duration: 1.2,
//           delay: 0.5,
//           ease: "easeOut",
//           times: [0, 0.7, 1]
//         }}
//       >
//         <motion.img
//           src={logoImage}
//           alt="Logo"
//           className="w-40 h-40"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.5 }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// // 메인 콘텐츠 컴포넌트
// const MarketplaceContent = () => {
//   const [startups, setStartups] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchStartups = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const [topResponse, logosResponse] = await Promise.all([
//         axios.get("https://picktartup.com/api/v1/startups/top", {
//           params: { source: "jpa" },
//         }),
//         axios.get("https://picktartup.com/api/v1/startups/logo-urls"),
//       ]);

//       const logoUrlMap = logosResponse.data.reduce((acc, startup) => {
//         if (startup.logoUrl) {
//           const urlParts = startup.logoUrl.split("/");
//           const fileName = urlParts[urlParts.length - 1];
//           urlParts[urlParts.length - 1] = encodeURIComponent(fileName);
//           const encodedUrl = urlParts.join("/");
//           acc[startup.startupId] = encodedUrl;
//         }
//         return acc;
//       }, {});

//       const startupsWithLogos = topResponse.data.data.map((startup) => ({
//         ...startup,
//         logoUrl: logoUrlMap[startup.startupId] || defaultImage,
//       }));

//       setStartups(startupsWithLogos);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("데이터를 가져오는 중 오류가 발생했습니다.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStartups();
//   }, []);

//   return (
//     <motion.div
//       className="w-full min-h-screen bg-white"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <MainVideo />
//       <div className="mt-10" />
//       <TokenInvestmentProcess />
//       <SimpleStats />

//       <div className="container mx-auto px-4 py-16">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//               <TrendingUp className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900">Trending Startup</h2>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {isLoading ? (
//             [...Array(6)].map((_, i) => (
//               <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden">
//                 <div className="aspect-[4/3] bg-gray-200" />
//                 <div className="p-5 space-y-4">
//                   <div className="h-4 bg-gray-200 rounded w-1/3" />
//                   <div className="h-6 bg-gray-200 rounded w-3/4" />
//                   <div className="h-2 bg-gray-200 rounded w-full" />
//                 </div>
//               </div>
//             ))
//           ) : (
//             startups.map((startup) => (
//               <NftCard
//                 key={startup.startupId}
//                 startupId={startup.startupId}
//                 name={startup.name}
//                 category={startup.category}
//                 industry_type={startup.industry_type}
//                 investmentStartDate={startup.investmentStartDate}
//                 investmentTargetDeadline={startup.investmentTargetDeadline}
//                 fundingProgress={startup.fundingProgress}
//                 currentCoin={startup.currentCoin}
//                 goalCoin={startup.goalCoin}
//                 image={startup.logoUrl}
//               />
//             ))
//           )}
//         </div>

//         <div className="text-center mt-12">
//           <button
//             onClick={() => navigate("/main/investment")}
//             className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all text-gray-600 hover:text-blue-600"
//           >
//             더 많은 스타트업 보기
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // 메인 Marketplace 컴포넌트
// const Marketplace = () => {
//   const [showLogo, setShowLogo] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowLogo(false);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <AnimatePresence mode="wait">
//         {showLogo ? (
//           <LogoAnimation />
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <MarketplaceContent />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Marketplace;