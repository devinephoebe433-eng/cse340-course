import pool from "../database.js";


/**
 * Get all projects
 */
export async function getAllProjects() {

    const sql = `
        SELECT 
            project_id,
            project_name,
            project_description,
            location,
            date,
            organization_id
        FROM projects
        ORDER BY date DESC;
    `;

    const result = await pool.query(sql);

    return result.rows;
}

/**
 * Get project by ID
 */
export async function getProjectById(project_id) {
    const sql = `
        SELECT p.*, o.organization_name 
        FROM projects p 
        JOIN organizations o ON p.organization_id = o.organization_id 
        WHERE p.project_id = $1
    `;
    const result = await pool.query(sql, [project_id]);
    return result.rows[0];
}

/**
 * Get categories for a specific project
 */
export async function getCategoriesByProjectId(project_id) {
    const sql = `
        SELECT c.* 
        FROM categories c
        JOIN project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
    `;
    const result = await pool.query(sql, [project_id]);
    return result.rows;
}
