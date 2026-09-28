import { FoodModel } from "../../models/food.js";

export const createFood = async (req, res) => {
  try {
    const { name, price, image, ingredients, category } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Food name is required" });
    }
    if (price === undefined || Number(price) <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a number above 0" });
    }
    if (!category) {
      return res.status(400).json({ message: "Choose a category" });
    }

    const newFood = await FoodModel.create({
      name: name.trim(),
      price: Number(price),
      image,
      ingredients,
      category,
    });

    const populatedFood = await newFood.populate("category");
    return res.status(201).json(populatedFood);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
