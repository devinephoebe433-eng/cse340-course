import pool from "../database.js";

/**
 * Get all organizations from the database
 */
async function getAllOrganizations() {
    try {
        const sql = "SELECT * FROM organizations ORDER BY organization_name";
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error("Error in getAllOrganizations:", error);
        throw error;
    }
}

export { getAllOrganizations };
