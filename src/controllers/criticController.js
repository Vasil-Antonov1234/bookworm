import { Router } from "express";
import criticService from "../services/criticService";

const criticController = Router();

criticController.get("/create", (req, res) => {
    res.render("critics/create", { pageTitle: "Create Critic" });
});

criticController.post("/create", async (req, res) => {
    const newCritic = req.body;

    await criticService.create(newCritic);

    res.redirect("/");
})

export default criticController;