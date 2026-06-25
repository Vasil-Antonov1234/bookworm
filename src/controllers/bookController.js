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
    
    try {
        const books = await bookService.getAll();
        
        res.render("books/search", { books })
    } catch (error) {
        console.log(error)
    };
});

bookController.get("/search/book", async (req, res) => {
    const searchData = req.query;
    
    try {
        const allBooks = await bookService.getAll();
        let filteredBooks = allBooks;

        if (searchData.year) {
            filteredBooks = allBooks.filter((x) => x.year.includes(searchData.year));
        }

        if (searchData.title) {
            filteredBooks = filteredBooks.filter((x) => x.title.toLowerCase().includes(searchData.title.toLocaleLowerCase()));
        }

        if (searchData.genre) {
            filteredBooks = filteredBooks.filter((x) => x.genre.toLocaleLowerCase().includes(searchData.genre.toLocaleLowerCase()));
        }
        
        res.render("books/search", { books: filteredBooks });
    } catch (error) {
        console.log(error.message)
    }
})

export default bookController;