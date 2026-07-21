import express from "express";
import { getAllCategories } from "../src/models/categories.js";

const router = express.Router();


router.get("/", async (req, res) => {

    const categories = await getAllCategories();

    res.render("categories", {
        title: "Categories",
        categories
    });

});


export default router;