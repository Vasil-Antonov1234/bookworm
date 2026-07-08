import { Router } from "express";
import homeController from "./controllers/homeController.js";
import bookController from "./controllers/bookController.js";
import criticController from "./controllers/criticController.js";
import authController from "./controllers/authController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/books", bookController);
routes.use("/critics", criticController);
routes.use("/users", authController);

routes.all("*page404", (req, res) => {
    res.render("404");
});

export default routes;