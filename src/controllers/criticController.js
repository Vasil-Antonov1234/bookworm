import { Router } from "express";

const criticController = Router();

criticController.get("/create", (req, res) => {
    res.render("critics/create", { pageTitle: "Create Critic" });
});

export default criticController;