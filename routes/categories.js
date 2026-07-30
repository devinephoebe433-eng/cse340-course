import express from "express";
import { body } from "express-validator";
import { 
    buildCategories, 
    buildCategoryDetail, 
    buildNewCategory, 
    handleNewCategory, 
    buildEditCategory, 
    handleEditCategory 
} from "../src/controllers/categories.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Validation Rules
const categoryValidation = [
    body("category_name")
        .trim()
        .notEmpty().withMessage("Category name is required.")
        .isLength({ min: 3, max: 100 }).withMessage("Category name must be between 3 and 100 characters.")
];

router.get("/", buildCategories);
router.get("/new", authMiddleware.requireAdmin, buildNewCategory);
router.post("/new", authMiddleware.requireAdmin, categoryValidation, handleNewCategory);
router.get("/edit/:categoryId", authMiddleware.requireAdmin, buildEditCategory);
router.post("/edit/:categoryId", authMiddleware.requireAdmin, categoryValidation, handleEditCategory);
router.get("/:categoryId", buildCategoryDetail);

export default router;
