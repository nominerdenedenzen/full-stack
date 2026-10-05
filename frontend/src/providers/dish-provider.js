"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useCategories } from "./category-provider.js";
import { server } from "@/app/_api/api.js";

const DishContext = createContext();

export const DishProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCategories } = useCategories();

  const fetchDishes = async (categoryId) => {
    try {
      setLoading(true);

      const res = await server.get("/food", {
        params: categoryId ? { categoryId } : {},
      });
      setDishes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch dishes:", err);
      setDishes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const addDish = async (dishData) => {
    const res = await server.post("/food", dishData);
    setDishes((prev) => [...prev, res.data]);
    await fetchCategories();
  };

  const updateDish = async (dishData, id) => {
    const res = await server.put(`/food/${id}`, dishData);
    setDishes((prev) =>
      prev.map((dish) => (dish._id === id ? res.data : dish)),
    );
  };

  const deleteDish = async (id) => {
    await server.delete(`/food/${id}`);
    setDishes((prev) => prev.filter((dish) => dish._id !== id));
    await fetchCategories();
  };

  return (
    <DishContext.Provider
      value={{ dishes, loading, fetchDishes, addDish, updateDish, deleteDish }}
    >
      {children}
    </DishContext.Provider>
  );
};

export const useDishes = () => useContext(DishContext);
