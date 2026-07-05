import { prisma } from "../lib/prisma";

export default {
    async create(newCritic) {

        try {
            const critic = await prisma.critic.create({ data: newCritic });

            return critic;
        } catch (error) {
            throw error;
        };
    },
    async getAll(filter) {
        try {
            return await prisma.critic.findMany({
                where: {
                    id: {
                        notIn: Array.isArray(filter.excludeIds) ?
                            filter.excludeIds : Number.isInteger(filter.excludeIds) ? [filter.excludeIds] : []
                    }
                }
            });
        } catch (error) {
            throw error;
        };
    }
}