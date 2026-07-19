import { prisma } from "../lib/prisma.js";
import { RepositoryError } from "../utils/errorUtil.js";

export default {
    async create(parsedData) {

        try {
            const newUser = await prisma.user.create({
                data: { ...parsedData }
            });

            return newUser;
        } catch (error) {
            
            if (error.code = "P2002") {
                throw new RepositoryError("email", "User whit thgis email already exists");
            }

            throw error;
        };

    },
    async getUserByEmail(email) {

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            return user;
        } catch (error) {
            throw error
        };

    }
}