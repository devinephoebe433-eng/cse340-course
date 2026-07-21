import pool from "../database.js";


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
