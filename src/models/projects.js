import pool from "../database.js";


/**
 * Get all projects
 */
export async function getUpcomingProjectsWithOrganization() {

    const sql = `
        SELECT 
            p.project_id,
            p.project_name,
            p.project_description,
            p.location,
            p.date,
            p.organization_id,
            o.organization_name
        FROM projects p
        JOIN organizations o ON p.organization_id = o.organization_id
        ORDER BY p.date ASC;
    `;

    const result = await pool.query(sql);

    return result.rows;
}

export async function getAllProjects() {

    const sql = `
        SELECT 
            p.project_id,
            p.project_name,
            p.project_description,
            p.location,
            p.date,
            p.organization_id,
            o.organization_name
        FROM projects p
        JOIN organizations o ON p.organization_id = o.organization_id
        ORDER BY p.date DESC;
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

/**
 * Create a new project
 */
export async function createProject(project_name, project_description, location, date, organization_id) {
    const sql = "INSERT INTO projects (project_name, project_description, location, date, organization_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await pool.query(sql, [project_name, project_description, location, date, organization_id]);
    return result.rows[0];
}

/**
 * Update an existing project
 */
export async function updateProject(project_id, project_name, project_description, location, date, organization_id) {
    const sql = "UPDATE projects SET project_name = $1, project_description = $2, location = $3, date = $4, organization_id = $5 WHERE project_id = $6 RETURNING *";
    const result = await pool.query(sql, [project_name, project_description, location, date, organization_id, project_id]);
    return result.rows[0];
}

/**
 * Update categories for a project (Replace existing)
 */
export async function updateProjectCategories(project_id, category_ids) {
    // Start a transaction
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Delete existing associations
        await client.query('DELETE FROM project_categories WHERE project_id = $1', [project_id]);
        
        // Insert new associations
        if (category_ids && category_ids.length > 0) {
            for (const cat_id of category_ids) {
                await client.query('INSERT INTO project_categories (project_id, category_id) VALUES ($1, $2)', [project_id, cat_id]);
            }
        }
        
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

/**
 * Check whether a user is volunteering for a project.
 */
export async function isUserVolunteering(project_id, user_id) {
    const sql = `
        SELECT 1
        FROM project_volunteers
        WHERE project_id = $1 AND user_id = $2
    `;
    const result = await pool.query(sql, [project_id, user_id]);
    return result.rowCount > 0;
}

/**
 * Add a user to a project's volunteer list.
 */
export async function addVolunteer(project_id, user_id) {
    const sql = `
        INSERT INTO project_volunteers (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING
        RETURNING *
    `;
    const result = await pool.query(sql, [project_id, user_id]);
    return result.rows[0];
}

/**
 * Remove a user from a project's volunteer list.
 */
export async function removeVolunteer(project_id, user_id) {
    const sql = `
        DELETE FROM project_volunteers
        WHERE project_id = $1 AND user_id = $2
        RETURNING *
    `;
    const result = await pool.query(sql, [project_id, user_id]);
    return result.rows[0];
}

/**
 * Get all projects for which a user has volunteered.
 */
export async function getProjectsByVolunteer(user_id) {
    const sql = `
        SELECT
            p.project_id,
            p.project_name,
            p.project_description,
            p.location,
            p.date,
            p.organization_id,
            o.organization_name
        FROM project_volunteers pv
        JOIN projects p ON p.project_id = pv.project_id
        JOIN organizations o ON o.organization_id = p.organization_id
        WHERE pv.user_id = $1
        ORDER BY p.date ASC, p.project_name ASC
    `;
    const result = await pool.query(sql, [user_id]);
    return result.rows;
}

/**
 * Get the number of volunteers registered for a project.
 */
export async function getVolunteerCount(project_id) {
    const sql = `
        SELECT COUNT(*)::int AS volunteer_count
        FROM project_volunteers
        WHERE project_id = $1
    `;
    const result = await pool.query(sql, [project_id]);
    return result.rows[0]?.volunteer_count || 0;
}
