import { Router } from "express";
import homeController from "./controllers/homeController.js";
import bookController from "./controllers/bookController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/books", bookController);

routes.all("*page404", (req, res) => {
    res.render("404");
});

export default routes;