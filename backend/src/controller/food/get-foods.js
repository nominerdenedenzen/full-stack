import { FoodModel } from "../../models/food.js";

export const getFoods = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { category: categoryId } : {};

    const foods = await FoodModel.find(filter).populate("category");
    return res.status(200).json(foods);
  } catch (err) {
    console.error("Error in getFoods:", err);

    return res.status(500).json({ message: err.message });
  }
};
