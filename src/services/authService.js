import usersRepository from "../repositories/usersRepository.js"

export default {
    async register(userData) {
        
        try {
            const newUser = await usersRepository.create(userData);
    
            return newUser;
        } catch (error) {
            throw error;
        }
        
    }
}