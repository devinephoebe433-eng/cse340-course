import express from "express";
import path from "path";
import { fileURLToPath } from "url";


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



// Organizations page
app.get("/organizations", (req, res) => {

    res.render("organizations", {
        title: "Organizations"
    });

});



// Projects page
app.get("/projects", (req, res) => {

    res.render("projects", {
        title: "Service Projects"
    });

});



// Categories page
app.get("/categories", (req, res) => {

    res.render("categories", {
        title: "Service Project Categories"
    });

});



// Contact page (optional)
app.get("/contact", (req, res) => {

    res.render("contact", {
        title: "Contact Us"
    });

});



// Signup page (optional)
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