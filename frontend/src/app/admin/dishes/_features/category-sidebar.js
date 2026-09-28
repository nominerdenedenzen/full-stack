"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    if (!newCategoryName) return;

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

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6 text-black w-full">
      <h2 className="font-bold text-lg text-gray-900">Categories</h2>

      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-3 border border-gray-200 rounded-xl bg-gray-50/50 flex flex-col gap-2"
          >
            <span className="text-sm font-semibold text-gray-900">
              {category.name}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-white border-gray-300 text-gray-800"
              >
                Rename
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-red-300 border-red-300 text-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
        <label className="text-xs font-semibold text-gray-700">
          New category
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="h-9 text-sm bg-white border-gray-300 text-gray-900"
          />
          <Button
            onClick={handleAddCategory}
            size="sm"
            className="h-9 px-4 bg-black text-white hover:bg-gray-800 font-medium shrink-0"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
