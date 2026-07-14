import pool from "../database.js";


/**
 * Get all service project categories
 * @returns {Array} List of categories
 */
export async function getAllCategories() {

    const sql = `
        SELECT category_id, category_name
        FROM categories
        ORDER BY category_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}