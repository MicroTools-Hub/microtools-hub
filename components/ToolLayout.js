import React from "react";

export default function ToolLayout({ children }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-10">
        {children}
      </div>
    </div>
  );
}
