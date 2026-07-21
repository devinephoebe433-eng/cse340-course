import express from "express";
import { buildProjects } from "../src/controllers/projects.js";

const router = express.Router();

router.get("/", buildProjects);

export default router;