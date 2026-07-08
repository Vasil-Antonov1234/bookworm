import { prisma } from "../lib/prisma.js";

export default {
    async create(userData) {
        
        try {
            const newUser = await prisma.user.create({
                data: {...userData}
            });

            return newUser;
        } catch (error) {
            throw error;
        };

    }
}