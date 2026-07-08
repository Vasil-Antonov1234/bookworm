import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("auth/register", {pageTitle: "Register Page"});
});

authController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const newUser = await authService.register(userData);
    
        res.redirect("/");
    } catch (error) {
        throw error;
    };

});

authController.get("/login", (req, res) => {
    res.render("auth/login", {pageTitle: "Login Page"});
});

export default authController;