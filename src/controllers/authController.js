import { Router } from "express";
import authService from "../services/authService.js";
import { isAuthenticated, isGuest } from "../middlewares/authMiddleware.js";
import * as z from "zod";
import { Prisma } from "../../generated/prisma/client.js"
const authController = Router();

authController.get("/register", isGuest, (req, res) => {
    res.render("auth/register", { pageTitle: "Register Page" });
});

authController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie("auth", token, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        let errors = {};
        let singleError = "";

        if (error instanceof z.ZodError) {
            errors = z.flattenError(error).fieldErrors;
            // singleError = singleError = Object.values(errors).flat()[0];
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002": errors.email = ["User whit thgis email already exists"];
                    // singleError = "User whit thgis email already exists";
                    break;
            }
        } else {
            singleError = error.message || "Something went wrong!";
        };

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