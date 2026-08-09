import pool from "../database.js";

/**
 * Get all categories from the database
 * This function is used to retrieve all category records for display.
 */
export const getAllCategories = async () => {
    const sql = "SELECT * FROM categories ORDER BY category_name ASC";
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        throw error;
    }
}

/**
 * Get category by ID
 */
export const getCategoryById = async (category_id) => {
    const sql = "SELECT * FROM categories WHERE category_id = $1";
    const result = await pool.query(sql, [category_id]);
    return result.rows[0];
}

/**
 * Get projects for a specific category
 */
export const getProjectsByCategoryId = async (category_id) => {
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
export const createCategory = async (category_name) => {
    const sql = "INSERT INTO categories (category_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [category_name]);
    return result.rows[0];
}

/**
 * Update an existing category
 */
export const updateCategory = async (category_id, category_name) => {
    const sql = "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *";
    const result = await pool.query(sql, [category_name, category_id]);
    return result.rows[0];
}
