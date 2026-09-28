"use client";

import { useRouter } from "next/navigation";
import Sidebar from "./_components/sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto h-screen">{children}</main>
    </div>
  );
}
