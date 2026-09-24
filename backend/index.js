import { connectDB } from "./src/database/db.js";
import express from "express";
import { authRouter } from "./src/route/auth/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import { categoriesRouter } from "./src/route/categories/categories.js";

dotenv.config();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);
app.post("/health", (req, res) => {
  res.status(200).json({ message: "API is HEALTH RUNNING" });
});

app.get("/", (req, res) => res.json({ message: "he is coming" }));

app.listen(port, () => {
  console.log("server has started successfully on:", port);
});
