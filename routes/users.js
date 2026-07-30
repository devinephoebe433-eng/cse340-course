import express from "express";
import userController from "../src/controllers/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/login", userController.buildLogin);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

// Protected routes
router.get("/users", authMiddleware.requireAdmin, userController.buildUsersList);

export default router;
