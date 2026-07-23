import express from "express";
import { buildCategories, buildCategoryDetail } from "../src/controllers/categories.js";

const router = express.Router();

router.get("/", buildCategories);
router.get("/:categoryId", buildCategoryDetail);

export default router;
