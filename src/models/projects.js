import pool from "../database.js";

/**
 * Get all projects from the database
 */
async function getAllProjects() {
    try {
        const sql = "SELECT p.*, o.organization_name FROM projects p JOIN organizations o ON p.organization_id = o.organization_id ORDER BY p.project_name";
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error("Error in getAllProjects:", error);
        throw error;
    }
}

export { getAllProjects };
