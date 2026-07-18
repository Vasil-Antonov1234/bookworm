import { prisma } from "../lib/prisma.js";
import { RepositoryError } from "../utils/errorUtil.js";

export default {
    async create(userData) {

        try {
            const newUser = await prisma.user.create({
                data: {
                    email: userData.email,
                    password: userData.password
                }
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