import pool from "../database.js";

const getAllUsers = async () => {
    try {
        const result = await pool.query("SELECT user_id, user_name, user_email, user_role FROM users ORDER BY user_name ASC");
        return result.rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
}

const registerUser = async (name, email, password, role = 'volunteer') => {
    try {
        const result = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password, user_role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, password, role]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export default {
    getAllUsers,
    getUserByEmail,
    registerUser
};
