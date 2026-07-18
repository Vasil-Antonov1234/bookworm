import { Router } from "express";
import authService from "../services/authService.js";
import { isAuthenticated, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtil.js";
import { createUserSchema } from "../schemas/userSchema.js";
const authController = Router();

authController.get("/register", isGuest, (req, res) => {
    res.render("auth/register", { pageTitle: "Register Page" });
});

authController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const parsedData = createUserSchema.parse(userData);
        
        const token = await authService.register(parsedData);


        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        
        const { errors, singleError } = getErrorMessage(error);

        res.status(400).render("auth/register", { errors, error: singleError, pageTitle: "Register Page", userData })
    };

});

authController.get("/login", isGuest, (req, res) => {
    res.render("auth/login", { pageTitle: "Login Page" });
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