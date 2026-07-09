import usersRepository from "../repositories/usersRepository.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

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

            if (!user) {
                throw new Error("Wrong user or password!");
            };

            const isPasswordValid = await bcrypt.compare(userData.password, user.password);

            if(!isPasswordValid) {
                throw new Error("Wrong user or password!");
            };

            const payload = {userId: user.id, userEmail: user.email};
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h"});

            return token;

        } catch (error) {
            throw error;
        };
    }
}