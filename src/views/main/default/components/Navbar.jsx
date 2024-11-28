// import React from "react";

// const Navbar = ({ activeSection, onScrollToSection }) => (
//   <div className="sticky top-16 z-40 bg-white/10 backdrop-blur-xl shadow-sm">
//     <div className="container mx-auto px-4">
//       <div className="flex items-center justify-between h-16">
//         <div className="flex items-center space-x-4">
//           <span className="font-bold text-gray-900">스타트업</span>
//           <nav className="flex items-center space-x-6 ml-8">
//             {["dashboard", "ssi", "articles"].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => onScrollToSection(section)}
//                 className={`text-sm font-medium ${
//                   activeSection === section
//                     ? "text-gray-900 font-bold"
//                     : "text-gray-500"
//                 } hover:text-gray-900`}
//               >
//                 {section === "dashboard"
//                   ? "대시보드"
//                   : section === "ssi"
//                   ? "SSI"
//                   : "최근 기사"}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Navbar;
