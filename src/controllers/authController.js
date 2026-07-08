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
    
        res.redirect("/auth/login");
    } catch (error) {
        console.log(error.message);
    };

});

authController.get("/login", (req, res) => {
    res.render("auth/login", {pageTitle: "Login Page"});
});

authController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const result = await authService.login(userData);
    } catch (error) {
        console.log(error.message);
    }

    res.redirect("/");
});

export default authController;