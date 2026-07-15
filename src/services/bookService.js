import bookRepository from "../repositories/bookRepository.js"

export default {
    async getAll(searchData = {}) {

        searchData.year = Number(searchData.year)

        try {
            return await bookRepository.getAll(searchData);
        } catch (error) {
            throw error;
        };
    },

    async create(parsedData, ownerId) {
        
        parsedData.userId = ownerId;

        try {
            await bookRepository.create(parsedData);
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

    async attach(bookId, criticId, reviewContent) {

        try {
            const result = await bookRepository.attach(Number(bookId), Number(criticId), reviewContent);

            return result;
        } catch (error) {
            throw error;
        };
    },

    async delete(bookId, userId) {
        try {
            const book = await bookRepository.getById(bookId);

            if (book.userId != userId) {
                throw new Error("Unauthorized");
            };

            await bookRepository.delete(Number(bookId), userId);
        } catch (error) {
            throw error;
        };
    },

    async edit(bookId, userId, editedBookData) {
        try {
            const book = await bookRepository.getById(bookId)

            if (book.userId !== userId) {
                throw new Error("Unauthorized");
            };

            editedBookData.rating = Number(editedBookData.rating);
            editedBookData.year = Number(editedBookData.year);

            await bookRepository.edit(bookId, userId, editedBookData);

        } catch (error) {
            throw error;
        };
    }
}