import { prisma } from "../lib/prisma.js";

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