import pool from "../database.js";


/**
 * Get all categories
 */
export async function getAllCategories() {

    const sql = `
        SELECT 
            category_id,
            category_name
        FROM categories
        ORDER BY category_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}

/**
 * Get category by ID
 */
export async function getCategoryById(category_id) {
    const sql = "SELECT * FROM categories WHERE category_id = $1";
    const result = await pool.query(sql, [category_id]);
    return result.rows[0];
}

/**
 * Get projects for a specific category
 */
export async function getProjectsByCategoryId(category_id) {
    const sql = `
        SELECT p.* 
        FROM projects p
        JOIN project_categories pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
    `;
    const result = await pool.query(sql, [category_id]);
    return result.rows;
}

/**
 * Create a new category
 */
export async function createCategory(category_name) {
    const sql = "INSERT INTO categories (category_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [category_name]);
    return result.rows[0];
}

/**
 * Update an existing category
 */
export async function updateCategory(category_id, category_name) {
    const sql = "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *";
    const result = await pool.query(sql, [category_name, category_id]);
    return result.rows[0];
}
