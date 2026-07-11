import usersRepository from "../repositories/usersRepository.js"
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/tokenUtil.js";

export default {
    async register(userData) {
        
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await usersRepository.create({ 
                ...userData, 
                password: hashedPassword 
            });

            const token = generateAuthToken(newUser);
    
            return token;
        } catch (error) {
            throw error;
        }
        
    },
    async login(userData) {
        
        try {
            const user = await usersRepository.getUserByEmail(userData.email);

            if (!user) {
                throw new Error("Wrong user or password!");
            };

            const isPasswordValid = await bcrypt.compare(userData.password, user.password);

            if(!isPasswordValid) {
                throw new Error("Wrong user or password!");
            };

            const token = generateAuthToken(user);

            return token;

        } catch (error) {
            throw error;
        };
    }
}