import express from "express";
import organizationRoutes from "./routes/organizations.js";
import projectRoutes from "./routes/projects.js";
import categoryRoutes from "./routes/categories.js";
import path from "path";
import { fileURLToPath } from "url";
<<<<<<< HEAD
=======
import { getAllCategories } from "./src/models/categories.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllOrganizations } from "./src/models/organizations.js";
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8


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


// Allow JSON data
app.use(express.json());


// ======================
// DATABASE ROUTES
// ======================

app.use("/organizations", organizationRoutes);

app.use("/projects", projectRoutes);

app.use("/categories", categoryRoutes);


// ======================
// HOME PAGE
// ======================

app.get("/", (req, res) => {

    res.render("home", {
        title: "Service Projects"
    });

});


// ======================
// CONTACT PAGE
// ======================

<<<<<<< HEAD
=======
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
>>>>>>> 6da28009ab39d7c696f29c895ebf18d55d2eb4d8
app.get("/contact", (req, res) => {

    res.render("contact", {
        title: "Contact Us"
    });

});


// ======================
// SIGNUP PAGE
// ======================

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
