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
