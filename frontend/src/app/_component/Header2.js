"use client";

import Link from "next/link";

const Header2 = () => {
  return (
    <header className="bg-black py-3 px-6 md:px-12 lg:px-20 border-b border-neutral-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-11 object-contain" />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/sign-up">
            <button className="bg-white text-black text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition">
              Sign up
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-[#EF4444] text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-red-600 transition">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header2;
