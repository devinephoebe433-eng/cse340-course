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
        ORDER BY date;
    `;

    const result = await pool.query(sql);

    return result.rows;
}