import express from "express";
import { body } from "express-validator";
import { 
    buildProjects, 
    buildProjectDetail,
    buildNewProject,
    handleNewProject,
    buildEditProject,
    handleEditProject,
    buildUpdateCategories,
    handleUpdateCategories
} from "../src/controllers/projects.js";

const router = express.Router();

// Validation Rules
const projectValidation = [
    body("project_name").trim().notEmpty().withMessage("Project name is required."),
    body("project_description").trim().notEmpty().withMessage("Description is required."),
    body("location").trim().notEmpty().withMessage("Location is required."),
    body("date").isDate().withMessage("Valid date is required."),
    body("organization_id").notEmpty().withMessage("Hosting organization is required.")
];

router.get("/", buildProjects);
router.get("/new", buildNewProject);
router.post("/new", projectValidation, handleNewProject);
router.get("/edit/:projectId", buildEditProject);
router.post("/edit/:projectId", projectValidation, handleEditProject);
router.get("/:projectId/categories", buildUpdateCategories);
router.post("/:projectId/categories", handleUpdateCategories);
router.get("/:projectId", buildProjectDetail);

export default router;
