import { Router } from "express";
import reviewService from "../services/reviewService";

const reviewController = Router();

reviewController.get("/create", (req, res) => {
    res.render("reviews/create", { pageTitle: "Create Review"});
});

reviewController.post("/create", async (req, res) => {
    const newReview = req.body;

    await reviewService.create(newReview);

    res.redirect("/");
})

export default reviewController;