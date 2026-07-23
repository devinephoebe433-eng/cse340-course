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

/**
 * Get organization by ID
 */
export async function getOrganizationById(organization_id) {
    const sql = "SELECT * FROM organizations WHERE organization_id = $1";
    const result = await pool.query(sql, [organization_id]);
    return result.rows[0];
}

/**
 * Get projects by organization ID
 */
export async function getProjectsByOrganizationId(organization_id) {
    const sql = "SELECT * FROM projects WHERE organization_id = $1";
    const result = await pool.query(sql, [organization_id]);
    return result.rows;
}
