import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controller/foodCategoryController.js";

import { requireToken } from "../../middleware/requireToken.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", requireToken, requireAdmin, createCategory);
router.put("/", requireToken, requireAdmin, updateCategory);
router.delete("/", requireToken, requireAdmin, deleteCategory);

export default router;
