import express from "express";

// import { deleteFood } from "../../controllers/food/delete-food.js";
// import { requireToken } from "../../middleware/require-token.js";
// import { requireAdmin } from "../../middleware/require-admin.js";
import { getFoods } from "../../controller/food/get-foods.js";
import { createFood } from "../../controller/food/create-food.js";
// import { createFood } from "../../controller/food/create-food.js";

const foodRouter = express.Router();

foodRouter.get("/", getFoods);
foodRouter.post("/", createFood);

// foodRouter.post("/", requireToken, requireAdmin, createFood);
// foodRouter.put("/:id", requireToken, requireAdmin);
// foodRouter.delete("/:id", requireToken, requireAdmin);

export default foodRouter;
