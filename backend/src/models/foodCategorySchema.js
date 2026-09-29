import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", foodCategorySchema);
