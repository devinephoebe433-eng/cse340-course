import { getAllCategories, getCategoryById, getProjectsByCategoryId, createCategory, updateCategory } from "../models/categories.js";
import { validationResult } from "express-validator";

export async function buildCategories(req, res) {
    const categories = await getAllCategories();
    res.render("categories", {
        title: "Categories",
        categories
    });
}

export async function buildCategoryDetail(req, res) {
    const category_id = req.params.categoryId;
    const category = await getCategoryById(category_id);

    if (!category) {
        return res.status(404).render("404", { title: "Category Not Found" });
    }

    const projects = await getProjectsByCategoryId(category_id);

    res.render("category-detail", {
        title: category.category_name,
        category,
        projects
    });
}

// GET New Category Form
export async function buildNewCategory(req, res) {
    res.render("category-form", {
        title: "Add New Category",
        action: "/categories/new",
        category: null
    });
}

// POST New Category
export async function handleNewCategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("category-form", {
            title: "Add New Category",
            action: "/categories/new",
            category: { category_name: req.body.category_name }
        });
    }

    try {
        await createCategory(req.body.category_name);
        req.flash("success", "Category created successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error creating category.");
        res.redirect("/categories/new");
    }
}

// GET Edit Category Form
export async function buildEditCategory(req, res) {
    const category = await getCategoryById(req.params.categoryId);
    if (!category) {
        req.flash("error", "Category not found.");
        return res.redirect("/management");
    }
    res.render("category-form", {
        title: "Edit Category",
        action: `/categories/edit/${category.category_id}`,
        category
    });
}

// POST Edit Category
export async function handleEditCategory(req, res) {
    const category_id = req.params.categoryId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.status(400).render("category-form", {
            title: "Edit Category",
            action: `/categories/edit/${category_id}`,
            category: { category_id, category_name: req.body.category_name }
        });
    }

    try {
        await updateCategory(category_id, req.body.category_name);
        req.flash("success", "Category updated successfully!");
        res.redirect("/management");
    } catch (error) {
        req.flash("error", "Error updating category.");
        res.redirect(`/categories/edit/${category_id}`);
    }
}
