"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import DishGridDialog from "./dish-grid-dialog";
import Dishcard from "../_components/dish-card";

export default function DishGrid() {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await server.get("/food");
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDishAdded = (newDish) => {
    setFoods((prev) => [...prev, newDish]);
  };

  return (
    <div className="bg-white p-6 rounded-xl border flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Dishes</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <DishGridDialog onDishAdded={handleDishAdded} />

        {foods.map((food) => (
          <Dishcard
            key={food._id}
            name={food.name}
            price={food.price}
            ingredients={food.ingredients}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
}
