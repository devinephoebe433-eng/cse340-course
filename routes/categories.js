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

const router = express.Router();

// Validation Rules
const categoryValidation = [
    body("category_name")
        .trim()
        .notEmpty().withMessage("Category name is required.")
        .isLength({ min: 3, max: 100 }).withMessage("Category name must be between 3 and 100 characters.")
];

router.get("/", buildCategories);
router.get("/new", buildNewCategory);
router.post("/new", categoryValidation, handleNewCategory);
router.get("/edit/:categoryId", buildEditCategory);
router.post("/edit/:categoryId", categoryValidation, handleEditCategory);
router.get("/:categoryId", buildCategoryDetail);

export default router;
