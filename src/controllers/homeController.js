import { Router } from "express";
import bookService from "../services/bookService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {

    try {
        const books = await bookService.getAll();

        res.render("index", { books });
    } catch (error) {
        console.log(error.message)
    };
});

homeController.get("/about", (req, res) => {

    res.render("about");
});

export default homeController;