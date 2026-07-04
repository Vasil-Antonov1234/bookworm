import bookRepository from "../repositories/bookRepository.js"

export default {
    async getAll(searchData) {
        
        try {
            return await bookRepository.getAll(searchData);
        } catch (error) {
            throw error;
        };
    },

    async create(newBook) {
        newBook.rating = Number(newBook.rating);
        newBook.year = Number(newBook.year);

        try {
          await bookRepository.create(newBook);  
        } catch (error) {
            throw error;
        };
    },

    async getById(bookId) {
        try {
          return await bookRepository.getById(Number(bookId));
        } catch (error) {
            throw error;
        };
    },

    async attach(bookId, reviewId) {

        try {
            const result = await bookRepository.attach(Number(bookId), Number(reviewId));

            return result;
        } catch (error) {
            throw error;
        };
    }
}