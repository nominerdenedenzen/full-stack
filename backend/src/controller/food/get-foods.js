import { FoodModel } from "../../models/food.js";

export const getFoods = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const filter = categoryId ? { category: categoryId } : {};

    const foods = await FoodModel.find(filter).populate("category");
    return res.status(200).json(foods);
  } catch (err) {
    return res.status(500).jsoon({ message: err.message });
  }
};
