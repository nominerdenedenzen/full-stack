"use client";

import { useCart } from "@/providers/cart-provider";

export const CardItem = ({ food }) => {
  const { updateQuantity } = useCart();

  return (
    <div className="rounded-xl bg-white border p-4 shadow-sm relative">
      <div className="flex gap-4 items-center">
        {/* Dish Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
          <img
            src={food.image || "/placeholder.png"}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Details Container */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h2 className="text-[22px] text-red-600 font-semibold">
                {food.name}
              </h2>
              <p className="text-[14px] font-normal text-zinc-500">
                {food.ingredients || food.description}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => updateQuantity(food._id, -food.quantity)}
              className="bg-white border border-zinc-400 rounded-full text-zinc-600 text-[16px] w-7 h-7 flex items-center justify-center hover:bg-zinc-100 transition"
            >
              X
            </button>
          </div>

          {/* Price & Quantity Controls Row */}
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-bold text-zinc-800">
                  ${(food.price * (food.quantity || 1)).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 border border-zinc-300 rounded-lg px-2 py-1">
                <button
                  onClick={() => updateQuantity(food._id, -1)}
                  className="text-zinc-600 px-1 font-bold"
                >
                  −
                </button>
                <span className="text-[14px] font-semibold">
                  {food.quantity || 1}
                </span>
                <button
                  onClick={() => updateQuantity(food._id, 1)}
                  className="text-zinc-600 px-1 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
