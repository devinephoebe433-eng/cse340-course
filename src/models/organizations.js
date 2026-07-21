import pool from "../database.js";

<<<<<<< HEAD

/**
 * Get all organizations
 */
export async function getAllOrganizations() {

    const sql = `
        SELECT 
            organization_id,
            organization_name,
            description,
            contact_email,
            logo
        FROM organizations
        ORDER BY organization_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}
=======
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
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
