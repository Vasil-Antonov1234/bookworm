import { Router } from "express";

const bookController = Router();

bookController.get("/create", (req, res) => {
    res.render("books/create");
});

export default bookController;