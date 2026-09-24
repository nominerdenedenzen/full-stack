import { Router } from "express";

export const categoriesRouter = Router();

const getCategories = (req, res) => {
  res.status(200).json({ message: "category running" });
};

categoriesRouter.get("/", getCategories);
