"use client";

import CategorySideBar from "./_features/category-sidebar";

const DishesPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-80 shrink-0">
        <CategorySideBar />
      </div>

      <div className="flex-1 bg-white p-6 rounded-2xl border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Dishes</h2>
        <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
          No dishes yet. They arrive on Day 4.
        </div>
      </div>
    </div>
  );
};

export default DishesPage;
