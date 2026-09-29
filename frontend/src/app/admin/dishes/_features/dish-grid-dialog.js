"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export default function DishGridDialog({ onDishAdded }) {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await server.get("/food-category");
      console.log("CATEGORIES", res.data);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    setNameError("");
    setPriceError("");
    setCategoryError("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("Food name is required");
      isValid = false;
    }

    if (!price || Number(price) <= 0) {
      setPriceError("Price must be a number above 0");
      isValid = false;
    }

    if (!categoryId) {
      setCategoryError("Please select a category");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await server.post("/food", {
        name: name.trim(),
        price: Number(price),
        ingredients,
        category: categoryId,
        image,
      });

      if (onDishAdded) {
        onDishAdded(res.data);
      }

      setOpen(false);
      setName("");
      setPrice("");
      setIngredients("");
      setCategoryId("");
      setImage("");
    } catch (err) {
      console.error("Error saving dish:", err);
      alert("Failed to save dish");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full border-2 border-dashed border-red-500 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer">
          <PlusIcon className="h-5 w-5 text-red-500" />
          <span className="font-medium text-red-500">Add dish</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none bg-transparent shadow-none">
        <div className="bg-white p-6 rounded-xl border shadow-lg flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add dish</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 text-sm">
            <div>
              <label className="font-semibold block mb-1">Food name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                className={`border w-full p-2 rounded outline-none ${
                  nameError ? "border-red-500" : "focus:border-red-500"
                }`}
              />
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setPriceError("");
                }}
                className={`border w-full p-2 rounded outline-none ${
                  priceError ? "border-red-500" : "focus:border-red-500"
                }`}
              />
              {priceError && (
                <p className="text-red-500 text-xs mt-1">{priceError}</p>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setCategoryError("");
                }}
                className={`border w-full p-2 rounded bg-white outline-none ${
                  categoryError ? "border-red-500" : "focus:border-red-500"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name || cat.categoryName}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-red-500 text-xs mt-1">{categoryError}</p>
              )}
            </div>

            <div>
              <label className="font-semibold block mb-1">Ingredients</label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="border w-full p-2 rounded outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border w-full p-2 rounded outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
