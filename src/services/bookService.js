import bookRepository from "../repositories/bookRepository.js"

export default {
    async getAll() {
        
        try {
            return await bookRepository.getAll();
        } catch (error) {
            throw error;
        };
    },

    async create(newBook) {
        try {
          await bookRepository.create(newBook);  
        } catch (error) {
            throw error;
        };
    }
}