// import video from "../assets/img/main/메인.mp4";
// import React, { useState, useEffect } from 'react';
// import Navbar from "components/navbar";  // 경로는 실제 구조에 맞게 수정


// const Main = () => {
//   const [showNav, setShowNav] = useState(false);
//   const [isFixed, setIsFixed] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const videoHeight = window.innerHeight;
//       const scrollPosition = window.scrollY;

//       // navbar 표시/숨김 처리
//       if (scrollPosition > videoHeight * 0.1) {
//         setShowNav(true);
//       } else {
//         setShowNav(false);
//       }

//       // navbar fixed 처리
//       if (scrollPosition >= videoHeight) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <div className={`${isFixed ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
//         showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
//       }`}>
//         <Navbar brandText="홈" />
//       </div>

//       <div className="relative w-screen overflow-hidden" style={{ height: '100vh', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
//         <video
//           src={video}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute w-full h-full object-cover"
//         />
//       </div>
//     </>
//   );
// };

// export default Main;''


import video from "../assets/img/main/메인 영상1.mp4";
import React, { useState, useEffect } from "react";
import Navbar from "components/navbar";

const Main = () => {
  const [showNav, setShowNav] = useState(false); // Navbar 표시 여부

  useEffect(() => {
    const handleScroll = () => {
      const videoHeight = document.querySelector("video")?.clientHeight || 0; // 영상 높이
      const scrollPosition = window.scrollY;

      // 스크롤 위치에 따라 Navbar 보이기/숨기기
      if (scrollPosition >= videoHeight) {
        setShowNav(true); // 영상 끝난 후 Navbar 고정
      } else {
        setShowNav(false); // 영상 위에서는 Navbar 숨김
      }
    };

    // 스크롤 이벤트 추가
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar 컨테이너 */}
      <div
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <Navbar brandText="홈" />
      </div>

      {/* 메인 비디오 */}
      {/* <div
        className="relative overflow-hidden mx-auto"
        style={{
          width: "80vw", // 너비를 80%로 줄임
          height: "40vh", // 높이를 40%로 줄임
          margin: "0 auto", // 가운데 정렬
        }}
      > */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden" style={{ height: '600px' }}>
        <video

          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default Main;
