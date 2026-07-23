import { getAllCategories, getCategoryById, getProjectsByCategoryId } from "../models/categories.js";

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
