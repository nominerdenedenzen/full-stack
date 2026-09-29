import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./src/database/db.js";
import { authRouter } from "./src/route/auth/auth.js";
import { categoriesRouter } from "./src/route/categories/categories.js";
import foodRouter from "./src/route/food/food-router.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRouter);
app.use("/food-category", categoriesRouter);
app.use("/food", foodRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
