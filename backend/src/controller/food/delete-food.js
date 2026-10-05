import { FoodModel } from "../../models/food.js";

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFood = await FoodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.status(200).json({ message: "Food deleted successfully", id });
  } catch (error) {
    console.error("Error deleting food:", error);
    return res.status(500).json({ message: error.message });
  }
};
