import { Router } from "express";

const reviewController = Router();

reviewController.get("/create", (req, res) => {
    res.render("reviews/create", { pageTitle: "Create Review"});
});

export default reviewController;