import reviewRepositori from "../repositories/reviewRepositori";

export default {
    async create(newReview) {
        newReview.rating = Number(newReview.rating);
        
        try {
            const review = await reviewRepositori.create(newReview);

            return review;
        } catch (error) {
            throw error;
        };
    }
}