import express from "express";
import { buildOrganizations } from "../src/controllers/organizations.js";

const router = express.Router();

router.get("/", buildOrganizations);

export default router;