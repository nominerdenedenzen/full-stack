"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { server } from "@/app/_api/api";

const Dishcard = (props) => {
  const foodData = props.food || props;
  const foodId = foodData._id || foodData.id;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: foodData.name || "",
    ingredients: foodData.ingredients || "",
    price: foodData.price || "",
    image: foodData.image || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!foodId) {
      console.error("Missing food ID", foodData);
      return;
    }

    try {
      setLoading(true);
      await server.put(`/food/${foodId}`, formData);
      setOpen(false);
    } catch (error) {
      console.error("Error updating food:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!foodId) {
      console.error("Missing food ID", foodData);
      return;
    }

    if (!confirm("Are you sure you want to delete this dish?")) return;

    try {
      setLoading(true);
      await server.delete(`/food/${foodId}`);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting food:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-sm w-full rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col">
        <div className="relative aspect-4/3 mb-4 overflow-hidden rounded-2xl">
          <img
            src={formData.image || "/food.png"}
            alt={formData.name || "Food item"}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="absolute bottom-3 right-3 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-50 transition-colors active:scale-95 duration-200"
              >
                <Edit2Icon className="w-5 h-5 text-red-500 stroke-[2.5]" />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dishes info</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-3 py-2">
                <div className="flex gap-6 items-center">
                  <p className="w-32 text-[16px] text-gray-600 font-normal">
                    Dish name
                  </p>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="flex-1 py-1 px-2 text-black rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex gap-6 items-center">
                  <p className="w-32 text-[16px] text-gray-600 font-normal">
                    Dish category
                  </p>
                  <select className="flex-1 py-1 px-2 text-black rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-500 bg-white">
                    <option>Select category</option>
                  </select>
                </div>

                <div className="flex gap-6 items-center">
                  <p className="w-32 text-[16px] text-gray-600 font-normal">
                    Ingredients
                  </p>
                  <input
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="flex-1 py-1 px-2 text-black rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex gap-6 items-center">
                  <p className="w-32 text-[16px] text-gray-600 font-normal">
                    Price
                  </p>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex-1 py-1 px-2 text-black rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex gap-6 items-center">
                  <p className="w-32 text-[16px] text-gray-600 font-normal">
                    Image
                  </p>
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="flex-1 py-1 px-2 text-black rounded-md border border-zinc-300 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="flex justify-between items-center mt-3">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="rounded-md px-3 py-3 border border-red-500 bg-white text-red-500 hover:bg-red-50"
                  >
                    <Trash2Icon />
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="py-3 px-4 bg-black text-white rounded-md hover:bg-zinc-800"
                  >
                    {loading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-1.5 px-0.5">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-[22px] leading-tight text-[#EF4444] tracking-tight">
              {foodData.name}
            </h3>
            <h4 className="text-black font-bold text-[18px] leading-tight pt-0.5">
              ${foodData.price}
            </h4>
          </div>
          <p className="font-normal text-[14px] leading-relaxed text-gray-600">
            {foodData.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dishcard;
