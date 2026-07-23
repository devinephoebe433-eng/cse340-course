import express from "express";
import organizationRoutes from "./routes/organizations.js";
import projectRoutes from "./routes/projects.js";
import categoryRoutes from "./routes/categories.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// ======================
// VIEW ENGINE SETUP
// ======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// ======================
// MIDDLEWARE
// ======================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ======================
// ROUTES
// ======================
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

// HOME PAGE
app.get("/", (req, res) => {
    res.render("home", { title: "Service Projects" });
});

// SIGNUP PAGE
app.get("/signup", (req, res) => {
    res.render("signup", { title: "Become a Volunteer" });
});

// 404 ERROR PAGE
app.use((req, res) => {
    res.status(404).render("404", { title: "Page Not Found" });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
