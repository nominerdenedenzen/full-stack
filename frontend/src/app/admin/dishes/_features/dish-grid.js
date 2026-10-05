"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import DishGridDialog from "./dish-grid-dialog";
import Dishcard from "../_components/dish-card";

const getId = (x) => (typeof x === "object" ? x?._id : x);

export default function DishGrid({ selectedCategoryId }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    server.get("/food").then((res) => setFoods(res.data));
    server.get("/food-category").then((res) => setCategories(res.data));
  }, []);

  const shownCategories = selectedCategoryId
    ? categories.filter((c) => c._id === getId(selectedCategoryId))
    : categories;

  return (
    <div className="flex flex-col gap-8 w-full mt-6">
      {shownCategories.map((category) => (
        <div
          key={category._id}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <DishGridDialog
              selectedCategoryId={category._id}
              onDishAdded={(newDish) => setFoods((prev) => [...prev, newDish])}
            />

            {foods
              .filter((food) => getId(food.category) === category._id)
              .map((food) => (
                <Dishcard
                  key={food._id}
                  id={food._id}
                  name={food.name}
                  price={food.price}
                  ingredients={food.ingredients}
                  image={food.image}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
