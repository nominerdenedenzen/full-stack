"use client";

import { useState, useEffect } from "react";
import { server } from "@/app/_api/api";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CategorySidebar({
  selectedCategoryId,
  onSelectCategory,
}) {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [renameInput, setRenameInput] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await server.get("/food-category");
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    setCategoryError("");
    if (!newCategoryName.trim()) {
      setCategoryError("Category name cannot be empty");
      return;
    }

    try {
      await server.post("/food-category", {
        name: newCategoryName.trim(),
      });
      setNewCategoryName("");
      setOpenAdd(false);
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      if (err.response?.status === 409) {
        setCategoryError("This category already exists");
      } else {
        setCategoryError("Failed to add category");
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await server.delete("/food-category", {
        data: { id },
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id),
      );

      setOpenEdit(false);
      if (selectedCategoryId === id) {
        onSelectCategory("");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleSaveRename = async (id) => {
    if (!renameInput.trim()) return;

    try {
      await server.put("/food-category", {
        id: id,
        name: renameInput.trim(),
      });

      setCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category._id === id) {
            return { ...category, name: renameInput.trim() };
          }
          return category;
        }),
      );

      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category._id);
    setEditingCategory(category);
    setRenameInput(category.name);
    setOpenEdit(true);
  };

  return (
    <div className="bg-white rounded-xl p-4 flex flex-wrap items-center gap-3 border border-gray-100 shadow-sm">
      <h2 className="font-bold text-lg text-gray-900 mr-2">
        Dishes Categories
      </h2>

      {/* "All Dishes" Button */}
      <button
        onClick={() => onSelectCategory("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategoryId === ""
            ? "bg-black text-white"
            : "border border-gray-300 text-gray-700 hover:border-black"
        }`}
      >
        All Dishes
      </button>

      {categories.map((category) => {
        const isSelected = selectedCategoryId === category._id;
        return (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isSelected
                ? "bg-black text-white"
                : "border border-gray-300 text-gray-700 hover:border-black"
            }`}
          >
            <span>{category.name}</span>
          </button>
        );
      })}

      {/* Category Edit / Delete / Save Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              className="h-10 text-sm px-3 border border-gray-300 rounded-lg outline-none focus:border-black"
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => handleDeleteCategory(editingCategory?._id)}
                className="px-3 py-2 bg-red-100 text-red-600 font-medium rounded-lg text-sm hover:bg-red-200"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleSaveRename(editingCategory?._id)}
                className="px-3 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg text-sm hover:bg-gray-200"
              >
                Rename
              </button>
              <button
                type="button"
                onClick={() => handleSaveRename(editingCategory?._id)}
                className="px-4 py-2 bg-black text-white font-medium rounded-lg text-sm hover:bg-zinc-800"
              >
                Save
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogTrigger asChild>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-full flex items-center justify-center shrink-0 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[350px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                setCategoryError("");
              }}
              className="h-10 text-sm px-3 border border-gray-300 rounded-lg outline-none focus:border-black"
            />
            {categoryError && (
              <p className="text-red-500 text-xs">{categoryError}</p>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-zinc-800"
              >
                Add
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
