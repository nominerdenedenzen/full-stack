"use client";

import Sidebar from "./_components/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen p-8">{children}</main>
    </div>
  );
}
