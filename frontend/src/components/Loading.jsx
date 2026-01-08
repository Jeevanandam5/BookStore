import React from "react";
import { FaBookOpen } from "react-icons/fa";

const Loading = ({ text = "Loading books for you..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

      {/* ICON */}
      <div className="relative">
        <FaBookOpen
          size={60}
          className="text-gray-800 animate-bounce"
        />

        {/* SHADOW */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-2 bg-gray-200 rounded-full blur-sm"></div>
      </div>

      {/* TEXT */}
      <p className="mt-6 text-sm tracking-wide text-gray-500 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loading;
