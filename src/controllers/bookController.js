import { Router } from "express";
import bookService from "../services/bookService.js";
import criticService from "../services/criticService.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { prepareCategoryOptions } from "../utils/prepareCatecoryOptions.js";
import * as z from "zod";
import { createBookSchema } from "../schemas/bookSchema.js";

const bookController = Router();

bookController.get("/create", isAuthenticated, (req, res) => {
    const categoryOptions = prepareCategoryOptions();
    res.render("books/create", { pageTitle: "Create Book", categoryOptions });
});

bookController.post("/create", isAuthenticated, async (req, res) => {
    const newBook = req.body;
    const ownerId = req.user.id;

    try {

        const parsedData = createBookSchema.parse(newBook);

        await bookService.create(parsedData, ownerId);

        res.redirect("/");
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;
            const categoryOptions = prepareCategoryOptions(newBook);
            res.status(400).render("books/create", { newBook, errors, pageTitle: "Create Book", categoryOptions })
        };
    };
});

bookController.get("/:bookId/details", async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?.id;


    try {
        const book = await bookService.getById(bookId);

        const isOwner = book.userId && book.userId === userId;

        const stars = "1".repeat(Math.floor(book.rating)).split("");

        res.render("books/details", { book, pageTitle: "Book Details", stars, isOwner });
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
        const critics = await criticService.getAll({ excludeIds: book.critics.map((x) => x.criticId) });

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
});

bookController.get("/:bookId/delete", isAuthenticated, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    try {
        await bookService.delete(bookId, userId);

        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
});

bookController.get("/:bookId/edit", isAuthenticated, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user.id;

    try {
        const book = await bookService.getById(bookId);
        const categoryOptions = prepareCategoryOptions(book);

        if (book.userId !== userId) {
            return res.status(401).send("Unauthorized");
        };

        res.render("books/edit", { pageTitle: "Edit Book", book, categoryOptions })
    } catch (error) {
        res.send(error.message)
    }
});

bookController.post("/:bookId/edit", isAuthenticated, async (req, res) => {
    const bookId = Number(req.params.bookId);
    const userId = req.user.id;
    const editedBookData = req.body;

    try {
        await bookService.edit(bookId, userId, editedBookData);

        res.redirect(`/books/${bookId}/details`);
    } catch (error) {
        res.send(error.message);
    };
})

export default bookController;