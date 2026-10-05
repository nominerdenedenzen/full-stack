import { FoodModel } from "../../models/food.js";

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, ingredients, price, image } = req.body;

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { name, category, ingredients, price, image },
      { new: true, runValidators: true },
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error("Error updating food:", error);
    return res.status(500).json({ message: error.message });
  }
};
