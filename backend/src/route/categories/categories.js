import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../controller/food-category/foodCategoryController.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);
categoriesRouter.delete("/", deleteCategory);
categoriesRouter.put("/", updateCategory);
