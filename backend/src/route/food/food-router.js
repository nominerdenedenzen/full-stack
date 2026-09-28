import express from "express";
import { getFoods } from "../../controllers/food/get-foods.js";
import { getFoodById } from "../../controllers/food/get-food-by-id.js";
import { createFood } from "../../controllers/food/create-food.js";
import { updateFood } from "../../controllers/food/update-food.js";
import { deleteFood } from "../../controllers/food/delete-food.js";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

const foodRouter = express.Router();

foodRouter.get("/", getFoods);
foodRouter.get("/:id", getFoodById);
foodRouter.post("/", requireToken, requireAdmin, createFood);
foodRouter.put("/:id", requireToken, requireAdmin, updateFood);
foodRouter.delete("/:id", requireToken, requireAdmin, deleteFood);

export default foodRouter;
