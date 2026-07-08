import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", { title: "Organizations" });
});

app.get("/projects", (req, res) => {
    res.render("projects", { title: "Service Projects" });
});

app.get("/categories", (req, res) => {
    res.render("categories", { title: "Service Project Categories" });
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});