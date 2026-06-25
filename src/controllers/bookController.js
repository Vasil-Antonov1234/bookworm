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
});

bookController.get("/:bookId/details", async (req, res) => {
    const bookId = req.params.bookId;

    try {
      const book = await bookService.getById(bookId);
      
      res.render("books/details", book);
    } catch (error) {
        console.log(error.message);
    };
});

bookController.get("/search", async (req, res) => {
    const books = await bookService.getAll();

    res.render("books/search", { books })
})

export default bookController;