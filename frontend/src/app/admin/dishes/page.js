"use client";

import { useState } from "react";
import CategorySidebar from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

export default function DishesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      <CategorySidebar
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <DishGrid selectedCategoryId={selectedCategoryId} />
    </div>
  );
}
