import { prisma } from "../lib/prisma";
import { RepositoryError } from "../utils/errorUtil.js";

export default {
    async create(newCritic) {

        try {
            const critic = await prisma.critic.create({ data: newCritic });

            return critic;
        } catch (error) {
            
            if (error.code === "P2002") {
                throw new RepositoryError("image", "This critic already exists in the database!")
            }
            
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