import criticRepository from "../repositories/criticRepository"

export default {
    async create(newCritic) {
        newCritic.age = Number(newCritic.age);

        return await criticRepository.create(newCritic);
    },
    async getAll(filter) {

        try {
            return await criticRepository.getAll(filter);
        } catch (error) {
            throw error;
        };

    }
}