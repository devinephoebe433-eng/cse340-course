import pool from "../database.js";


/**
 * Get all organizations
 */
export const getAllOrganizations = async () => {

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
export const getOrganizationById = async (organization_id) => {
    const sql = "SELECT * FROM organizations WHERE organization_id = $1";
    const result = await pool.query(sql, [organization_id]);
    return result.rows[0];
}

/**
 * Get projects by organization ID
 */
export const getProjectsByOrganizationId = async (organization_id) => {
    const sql = "SELECT * FROM projects WHERE organization_id = $1";
    const result = await pool.query(sql, [organization_id]);
    return result.rows;
}

/**
 * Create a new organization
 */
export const createOrganization = async (organization_name, description, contact_email, logo) => {
    const sql = "INSERT INTO organizations (organization_name, description, contact_email, logo) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await pool.query(sql, [organization_name, description, contact_email, logo]);
    return result.rows[0];
}

/**
 * Update an existing organization
 */
export const updateOrganization = async (organization_id, organization_name, description, contact_email, logo) => {
    const sql = "UPDATE organizations SET organization_name = $1, description = $2, contact_email = $3, logo = $4 WHERE organization_id = $5 RETURNING *";
    const result = await pool.query(sql, [organization_name, description, contact_email, logo, organization_id]);
    return result.rows[0];
}
