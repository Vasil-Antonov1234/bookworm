import usersRepository from "../repositories/usersRepository.js"
import bcrypt from "bcrypt";

export default {
    async register(userData) {
        
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await usersRepository.create({ email: userData.email, password: hashedPassword });
    
            return newUser;
        } catch (error) {
            throw error;
        }
        
    }
}