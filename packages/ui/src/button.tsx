"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean; // Add this line
}

export const Button = ({
  onClick,
  children,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled} // Add this line
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none focus:ring-4 focus:ring-gray-300 
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
    >
      {children}
    </button>
  );
};
