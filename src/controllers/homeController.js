import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
    res.render("index");
});

homeController.get("/about", (req, res) => {
    res.render("about");
});

export default homeController;