import { Router } from "express";
import bookService from "../services/bookService.js";

const bookController = Router();

bookController.get("/create", (req, res) => {
    res.render("books/create");
});

bookController.post("/create", async (req, res) => {
    const newBook = req.body;

    try {
       await bookService.create(newBook);
       
       res.redirect("/");
    } catch (error) {
        console.log(error.message);
    };
})

export default bookController;