"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

export default function DishGrid({
  categoryName = "Category",
  categories = [],
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");

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

    if (!category) {
      setCategoryError("Choose a category");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await axios.post("http://localhost:8000/food", {
        name: name.trim(),
        price: Number(price),
        ingredients,
        category,
        image,
      });

      setOpen(false);
      setName("");
      setPrice("");
      setIngredients("");
      setCategory("");
      setImage("");
    } catch (err) {
      alert("Failed to save dish");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="w-full border-2 border-dashed border-red-500 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
            <PlusIcon className="h-5 w-5 text-red-500" />
            <span className="font-medium text-red-500">Add dish</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none bg-transparent shadow-none">
          <div className="bg-white p-6 rounded-xl border shadow-lg flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Add dish to {categoryName}
              </DialogTitle>
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
                <label className="font-semibold block mb-1">Ingredients</label>
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="border w-full p-2 rounded outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCategoryError("");
                  }}
                  className={`border w-full p-2 rounded bg-white outline-none ${
                    categoryError ? "border-red-500" : "focus:border-red-500"
                  }`}
                >
                  <option value="">Choose a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {categoryError && (
                  <p className="text-red-500 text-xs mt-1">{categoryError}</p>
                )}
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
    </div>
  );
}
