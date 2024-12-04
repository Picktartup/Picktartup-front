import React from "react";

const SmallButton = ({ label, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md ${color} text-white hover:opacity-80`}
    >
      {label}
    </button>
  );
};

export default SmallButton;
