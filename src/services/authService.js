import usersRepository from "../repositories/usersRepository.js"
import bcrypt from "bcrypt";

export default {
    async register(userData) {
        
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await usersRepository.create({ 
                ...userData, 
                password: hashedPassword 
            });
    
            return newUser;
        } catch (error) {
            throw error;
        }
        
    },
    async login(userData) {
        
        try {
            const user = await usersRepository.getUserByEmail(userData.email);

            
        } catch (error) {
            throw error;
        };
    }
}