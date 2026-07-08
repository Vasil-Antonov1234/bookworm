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

    }
}