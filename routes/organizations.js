import express from "express";
import { body } from "express-validator";
import { 
    buildOrganizations, 
    buildOrganizationDetail,
    buildNewOrganization,
    handleNewOrganization,
    buildEditOrganization,
    handleEditOrganization
} from "../src/controllers/organizations.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Validation Rules
const orgValidation = [
    body("organization_name").trim().notEmpty().withMessage("Organization name is required."),
    body("description").trim().notEmpty().withMessage("Description is required."),
    body("contact_email").isEmail().withMessage("Valid email is required."),
    body("logo").trim().notEmpty().withMessage("Logo filename is required.")
];

router.get("/", buildOrganizations);
router.get("/new", authMiddleware.requireAdmin, buildNewOrganization);
router.post("/new", authMiddleware.requireAdmin, orgValidation, handleNewOrganization);
router.get("/edit/:organizationId", authMiddleware.requireAdmin, buildEditOrganization);
router.post("/edit/:organizationId", authMiddleware.requireAdmin, orgValidation, handleEditOrganization);
router.get("/:organizationId", buildOrganizationDetail);

export default router;
