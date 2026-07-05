import criticRepository from "../repositories/criticRepository"

export default {
    async create(newCritic) {
        return await criticRepository.create(newCritic);
    }
}