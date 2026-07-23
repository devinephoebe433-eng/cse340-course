import express from "express";
import { buildOrganizations, buildOrganizationDetail } from "../src/controllers/organizations.js";

const router = express.Router();

router.get("/", buildOrganizations);
router.get("/:organizationId", buildOrganizationDetail);

export default router;
