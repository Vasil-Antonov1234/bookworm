import { Router } from "express";
import criticService from "../services/criticService";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createCriticSchema } from "../schemas/criticSchema.js";
import { getErrorMessage } from "../utils/errorUtil.js";

const criticController = Router();

criticController.get("/create", isAuthenticated, (req, res) => {
    res.render("critics/create");
});

criticController.post("/create", isAuthenticated, async (req, res) => {
    const newCritic = req.body;

    
    try {
        const parsedData = createCriticSchema.parse(newCritic);
        
        await criticService.create(parsedData);

        res.redirect("/");
    } catch (error) {

        const { errors, singleError } = getErrorMessage(error);

        res.status(400).render("critics/create", { errors, error: singleError, newCritic})
    }

})

export default criticController;