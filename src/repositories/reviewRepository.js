import { prisma } from "../lib/prisma";

export default {
    async create(newReview) {

        try {
            const review = await prisma.review.create({ data: newReview });

            return review;
        } catch (error) {
            throw error;
        }

    },
    async getAll(filter) {
        try {
            return await prisma.review.findMany({
                where: {
                    id: { notIn: Array.isArray(filter.excludeIds)? 
                                                    filter.excludeIds : Number.isInteger(filter.excludeIds)? [filter.excludeIds] : [] }
                }
            });
        } catch (error) {
            throw error;
        };
    }
}