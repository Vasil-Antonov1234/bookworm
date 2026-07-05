import { prisma } from "../lib/prisma";

export default {
    async create(newCritic) {

        try {
            const critic = await prisma.critic.create({ data: newCritic });

            return critic;
        } catch (error) {
            throw error;
        };
    }
}