import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: DATABASE_URL environment variable is missing!");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("render.com") 
        ? { rejectUnauthorized: false } 
        : false
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

// Test connection and setup tables
const initDb = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Database connected successfully');
        
        // Ensure users table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                user_name VARCHAR(100) NOT NULL,
                user_email VARCHAR(100) NOT NULL UNIQUE,
                user_password VARCHAR(255) NOT NULL,
                user_role VARCHAR(20) DEFAULT 'volunteer' NOT NULL
            )
        `);
        
        // Ensure the volunteer relationship table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS project_volunteers (
                project_id INT NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
                user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                volunteered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (project_id, user_id)
            )
        `);

        // Ensure admin user exists
        const adminEmail = 'admin@example.com';
        const adminCheck = await client.query('SELECT * FROM users WHERE user_email = $1', [adminEmail]);
        if (adminCheck.rows.length === 0) {
            // Hash for 'cse340!'
            const adminPass = '$2b$10$GDiR2D1ziLMn5tRn7NOhu.XwHro/Thuu.ka5QtLlNcoYRcPs/.W/S';
            await client.query(
                'INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4)',
                ['Admin User', adminEmail, adminPass, 'admin']
            );
            console.log('✅ Admin testing account created');
        }
        
        client.release();
    } catch (err) {
        console.error('❌ Database initialization failed:', err.message);
    }
}

initDb();

export default pool;