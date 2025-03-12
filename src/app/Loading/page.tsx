import React from "react";

interface LoadingProps {
  value: string;
}

export default function Loading({ value }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a1f38] text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-gray-400">{value}...</p>
    </div>
  );
}
