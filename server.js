import express from "express";
import session from "express-session";
import flash from "connect-flash";
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

// Session and Flash Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// ======================
// ROUTES
// ======================
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/categories", categoryRoutes);

// MANAGEMENT ROUTE
app.get("/management", (req, res) => {
    res.render("management", { title: "Management Console" });
});

// HOME PAGE
app.get("/", (req, res) => {
    res.render("home", { title: "Service Projects" });
});

// SIGNUP PAGE (GET)
app.get("/signup", (req, res) => {
    res.render("signup", { title: "Become a Volunteer" });
});

// SIGNUP PAGE (POST)
app.post("/signup", (req, res) => {
    const { name, email, interest, message } = req.body;
    console.log(`New Volunteer Signup: ${name} (${email}) for ${interest}`);
    
    res.render("thank-you", { 
        title: "Thank You!",
        name: name
    });
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
