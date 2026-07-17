import { Router } from "express";
import criticService from "../services/criticService";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import * as z from "zod";
import { Prisma } from "../../generated/prisma/client.js"
import { createCriticSchema } from "../schemas/criticSchema.js";

const criticController = Router();

criticController.get("/create", isAuthenticated, (req, res) => {
    res.render("critics/create", { pageTitle: "Create Critic" });
});

criticController.post("/create", isAuthenticated, async (req, res) => {
    const newCritic = req.body;

    
    try {
        const parsedData = createCriticSchema.parse(newCritic);
        
        await criticService.create(parsedData);

        res.redirect("/");
    } catch (error) {
        let errors = {};
        let singleError = ""

        if (error instanceof z.ZodError) {
            errors = z.flattenError(error).fieldErrors;
            // singleError = singleError = Object.values(errors).flat()[0];
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // switch(error.code) {
            //     case: ""
            // }
        } else {
            singleError = error.message || "Something went wrong!";
        };

        res.status(400).render("critics/create", { errors, error: singleError, newCritic, pageTitle: "Create Critic"})
    }

})

export default criticController;