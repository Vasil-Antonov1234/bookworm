import { Router } from "express";
import criticService from "../services/criticService";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const criticController = Router();

criticController.get("/create", isAuthenticated, (req, res) => {
    res.render("critics/create", { pageTitle: "Create Critic" });
});

criticController.post("/create", isAuthenticated, async (req, res) => {
    const newCritic = req.body;

    await criticService.create(newCritic);

    res.redirect("/");
})

export default criticController;