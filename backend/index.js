import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./connectDB.js";

import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/food-category/food-category-router.js";
import foodRouter from "./router/food/food-router.js";
import orderRouter from "./router/order/order-router.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
