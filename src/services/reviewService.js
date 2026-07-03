import reviewRepository from "../repositories/reviewRepository";

export default {
    async create(newReview) {
        newReview.rating = Number(newReview.rating);
        
        try {
            const review = await reviewRepository.create(newReview);

            return review;
        } catch (error) {
            throw error;
        };
    },
    async getAll() {

        try {
           return await reviewRepository.getAll();
        } catch (error) {
            throw error;
        };

    }
}