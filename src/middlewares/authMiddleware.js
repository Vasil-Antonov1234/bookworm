import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export function authMiddleware(req, res, next) {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    };

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;
    } catch (error) {
        console.error("Invalid token!");
        res.clearCookie("auth");
        
        return res.redirect("/auth/login");
    };

    next();
};

export function isAuthenticated(req, res, next) {

    if (!req.user) {
        return res.redirect("/auth/login")
    }

    next();
};

export function isGuest(req, res, next) {

    if (res.user) {
        return res.redirect("/");
    }

    next();
};