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
