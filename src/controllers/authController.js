import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("auth/register", {pageTitle: "Register Page"});
});

authController.post("/register", async (req, res) => {
    const userData = req.body;

    const newUser = await authService.register(userData);

    res.redirect("/");
});

export default authController;