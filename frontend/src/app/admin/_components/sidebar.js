"use client";
import { LayoutDashboardIcon, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
      <div className="flex flex-col items-center gap-10">
        <img src="/logo.png" className="max-w-[165px]" alt="Logo" />
        <div className="flex flex-col gap-7">
          <button
            onClick={() => router.push("/admin/food-menu")}
            className="flex gap-2.5 rounded-full bg-black text-white py-3 px-4 items-center"
          >
            <LayoutDashboardIcon className="text-white h-4 w-4" />
            Food menu
          </button>

          <button
            onClick={() => router.push("/admin/orders")}
            className="flex gap-2.5 rounded-full bg-white text-black py-3 px-4 items-center"
          >
            <Truck className="h-4 w-4" />
            Orders
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
