import { Router } from "express";
import bookService from "../services/bookService.js";

const bookController = Router();

bookController.get("/create", (req, res) => {
    res.render("books/create", { pageTitle: "Create Book" });
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
        const stars = "&#x2605;".repeat(Math.floor(book.rating));

        res.render("books/details", { book, pageTitle: "Book Details", stars } );
    } catch (error) {
        console.log(error.message);
    };
});

bookController.get("/search", async (req, res) => {

    const searchData = req.query;

    try {
        const books = await bookService.getAll(searchData);
        
        res.render("books/search", { books, searchData, pageTitle: "Search Book" });
    } catch (error) {
        console.log(error.message)
    }
});

export default bookController;