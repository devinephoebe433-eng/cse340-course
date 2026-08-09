import userModel from "../models/users.js";
import bcrypt from "bcrypt";

const buildLogin = async (req, res) => {
    res.render("login", { title: "Login", nav: [] });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.user_password)) {
            req.session.loggedin = true;
            req.session.user = {
                id: user.user_id,
                name: user.user_name,
                email: user.user_email,
                role: user.user_role
            };
            req.flash("success", `Welcome back, ${user.user_name}!`);
            res.redirect("/dashboard");
        } else {
            req.flash("error", "Invalid email or password.");
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Login error:", error);
        req.flash("error", "An error occurred during login.");
        res.redirect("/login");
    }
}

const logoutUser = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.registerUser(name, email, hashedPassword);
        req.flash("success", "Registration successful! You can now log in.");
        res.redirect("/login");
    } catch (error) {
        console.error("Registration error:", error);
        req.flash("error", "An error occurred during registration. Email might already be in use.");
        res.redirect("/signup");
    }
}

const buildUsersList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.render("users", {
            title: "Registered Users",
            users: users
        });
    } catch (error) {
        console.error("Error building users list:", error);
        req.flash("error", "Could not retrieve user list.");
        res.redirect("/management");
    }
}

export default {
    buildLogin,
    loginUser,
    logoutUser,
    registerUser,
    buildUsersList
};
