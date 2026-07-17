import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAllCategories } from "./src/models/categories.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllOrganizations } from "./src/models/organizations.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";


// ======================
// VIEW ENGINE SETUP
// ======================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);



// ======================
// MIDDLEWARE
// ======================

// Serve CSS, images, JavaScript files
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// Allow form data
app.use(
    express.urlencoded({
        extended: true
    })
);



// ======================
// ROUTES
// ======================


// Home page
app.get("/", (req, res) => {

    res.render("home", {
        title: "Service Projects"
    });

});



// Organizations page (DATABASE CONNECTED)
app.get("/organizations", async (req, res) => {

    try {
        const organizations = await getAllOrganizations();
        res.render("organizations", {
            title: "Organizations",
            organizations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Database Error");
    }

});



// Projects page (DATABASE CONNECTED)
app.get("/projects", async (req, res) => {

    try {
        const projects = await getAllProjects();
        res.render("projects", {
            title: "Service Projects",
            projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Database Error");
    }

});



// Categories page (DATABASE CONNECTED)
app.get("/categories", async (req, res) => {

    try {

        const categories = await getAllCategories();

        res.render("categories", {
            title: "Service Project Categories",
            categories
        });

    } catch (error) {

        console.log(error);

        res.status(500).send(
            "Database Error"
        );

    }

});



// Contact page
app.get("/contact", (req, res) => {

    res.render("contact", {
        title: "Contact Us"
    });

});



// Signup page
app.get("/signup", (req, res) => {

    res.render("signup", {
        title: "Become a Volunteer"
    });

});



// ======================
// 404 ERROR PAGE
// ======================

app.use((req, res) => {

    res.status(404).render("404", {
        title: "Page Not Found"
    });

});



// ======================
// START SERVER
// ======================

app.listen(PORT, HOST, () => {

    console.log(
        `✅ Server running at http://localhost:${PORT}`
    );

});
