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
    async getAll() {
        try {
            return await prisma.review.findMany();
        } catch (error) {
            throw error;
        };
    }
}