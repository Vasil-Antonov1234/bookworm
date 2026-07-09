import { Router } from "express";
import authService from "../services/authService.js";
import { isAuthenticated, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get("/register", isGuest, (req, res) => {
    res.render("auth/register", {pageTitle: "Register Page"});
});

authController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const newUser = await authService.register(userData);
    
        res.redirect("/auth/login");
    } catch (error) {
        res.send(error.message);
    };

});

authController.get("/login", isGuest, (req, res) => {
    res.render("auth/login", {pageTitle: "Login Page"});
});

authController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.login(userData);

        res.cookie("auth", token, { httpOnly: true });
        
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }

});

authController.get("/logout", isAuthenticated, (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

export default authController;