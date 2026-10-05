"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { server } from "@/app/_api/api";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await server.get("/food-category");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (categoryName) => {
    const res = await server.post("/food-category", { categoryName });
    setCategories((prev) => [...prev, res.data]);
  };

  const renameCategory = async (id, categoryName) => {
    const res = await server.put(`/food-category/${id}`, { categoryName });
    setCategories((prev) =>
      prev.map((cat) => (cat._id === id ? res.data : cat)),
    );
  };

  const deleteCategory = async (id) => {
    await server.delete(`/food-category/${id}`);
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        fetchCategories,
        addCategory,
        renameCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
