import mongoose, { Schema } from "mongoose";

const foodCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { timestamps: true },
);

export const FoodCategory =
  mongoose.models.FoodCategory ||
  mongoose.model("FoodCategory", foodCategorySchema);
