import pool from "../database.js";

<<<<<<< HEAD

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
=======
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
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
