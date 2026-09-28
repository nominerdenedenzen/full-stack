"use client";

import { useState, useEffect } from "react";
import { server } from "@/app/_api/api";

export default function CategorySidebar() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await server.get("/food-category");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await server.post("/food-category", {
        name: newCategoryName,
      });
      setCategories([res.data, ...categories]);
      setNewCategoryName("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await server.delete("/food-category", { data: { id } });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6 text-black w-full">
      <h2 className="font-bold text-lg text-gray-900">Categories</h2>

      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 flex items-center justify-between"
          >
            <span className="text-sm font-semibold text-gray-900">
              {category.name}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="py-1 px-3 text-xs border rounded-md border-red-300 bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
        <label className="text-xs font-semibold text-gray-700">
          New category
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="h-9 text-sm px-3 border border-gray-300 rounded-md bg-white text-gray-900 w-full focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            onClick={handleAddCategory}
            className="h-9 px-4 bg-black text-white hover:bg-gray-800 rounded-md text-sm font-medium shrink-0 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
