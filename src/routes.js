import { Router } from "express";
import homeController from "./controllers/homeController.js";
import bookController from "./controllers/bookController.js";
import reviewController from "./controllers/reviewController.js";
import criticController from "./controllers/criticController.js";

const routes = Router();

routes.use("/", homeController);
routes.use("/books", bookController);
routes.use("/critics", criticController);

routes.all("*page404", (req, res) => {
    res.render("404");
});

export default routes;