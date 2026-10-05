import express from "express";

import { getFoods } from "../../controller/food/get-foods.js";
import { createFood } from "../../controller/food/create-food.js";
import { deleteFood } from "../../controller/food/delete-food.js";
import { updateFood } from "../../controller/food/update-food.js";

const foodRouter = express.Router();

foodRouter.get("/", getFoods);
foodRouter.post("/", createFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);

export default foodRouter;
