"use client";

import CategorySideBar from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

const DishesPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-80 shrink-0">
        <CategorySideBar />
      </div>

      <div className="flex-1">
        <DishGrid />
      </div>
    </div>
  );
};

export default DishesPage;
