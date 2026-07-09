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
        res.send(error.message);
    };

});

authController.get("/login", (req, res) => {
    res.render("auth/login", {pageTitle: "Login Page"});
});

authController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.login(userData);

        res.cookie("auth", token, { httpOnly: true });
        
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }

});

export default authController;