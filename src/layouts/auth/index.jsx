// src/layouts/auth/index.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import SignIn from "views/auth/SignIn";
import SignUpStep1 from "views/auth/SignUpStep1";
import SignUpStep2 from "views/auth/SignUpStep2";

export default function AuthLayout(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = React.useState("Sign In");

  React.useEffect(() => {
    if (location.pathname.includes("/sign-in")) {
      setCurrentRoute("Sign In");
    } else if (location.pathname.includes("/signup")) {
      setCurrentRoute("Sign Up");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logoText={"PicktartUp"}
        brandText={currentRoute}
        {...rest}
      />
      <div className="pt-[20px]"> {/* Reduced padding-top from 100px to 60px */}
      <Routes>
          {/* 명시적인 라우트 매칭 */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/signup/step1" element={<SignUpStep1 />} />
          <Route path="/signup/step2" element={<SignUpStep2 />} />
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </Routes>
      </div>
    </div>
  );
}