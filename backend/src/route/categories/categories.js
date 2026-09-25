import { Router } from "express";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

export const categoriesRouter = Router();

const getCategories = (req, res) => {
  console.log("GET /categories called");
  res.status(200).json({ message: "category running" });
};

const createCategory = (req, res) => {
  console.log("POST /categories/create called with body:", req.body);
  res.status(200).json({ message: "you are calling create createCategory" });
};

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/create", requireToken, requireAdmin, createCategory);
