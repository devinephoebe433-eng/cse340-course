import express from "express";
import { buildProjects, buildProjectDetail } from "../src/controllers/projects.js";

const router = express.Router();

router.get("/", buildProjects);
router.get("/:projectId", buildProjectDetail);

export default router;
