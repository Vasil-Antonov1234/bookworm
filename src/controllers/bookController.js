import { Router } from "express";
import bookService from "../services/bookService.js";
import criticService from "../services/criticService.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const bookController = Router();

bookController.get("/create", isAuthenticated, (req, res) => {
    res.render("books/create", { pageTitle: "Create Book" });
});

bookController.post("/create", isAuthenticated, async (req, res) => {
    const newBook = req.body;
    const ownerId = res.user.id;

    try {
        await bookService.create(newBook, ownerId);

        res.redirect("/");
    } catch (error) {
        console.log(error.message);
    };
});

bookController.get("/:bookId/details", async (req, res) => {
    const bookId = req.params.bookId;

    
    try {
        const book = await bookService.getById(bookId);

        const stars = "1".repeat(Math.floor(book.rating)).split("");

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

bookController.get("/:bookId/attach", isAuthenticated, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookService.getById(bookId);
        const critics = await criticService.getAll({excludeIds: book.critics.map((x) => x.criticId) });
        
        res.render("books/attach", { book, critics, pageTitle: "Attach Critic" });
    } catch (error) {
        throw error;
    };
});

bookController.post("/:bookId/attach", isAuthenticated, async (req, res) => {
    const bookId = req.params.bookId;
    const criticId = req.body.critic;
    const reviewContent = req.body.review;

    try {
        await bookService.attach(bookId, criticId, reviewContent);

        res.redirect(`/books/${bookId}/details`)
    } catch (error) {
        throw error;
    };
})

export default bookController;