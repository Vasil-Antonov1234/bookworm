import { prisma } from "../lib/prisma.js"

export default {
    async getAll(searchData = {}) {
        
        try {            
            const allBooks = await prisma.book.findMany({
                where: {
                    year: searchData.year || undefined, 
                    title: { contains: searchData.title, mode: "insensitive" },
                    genre: { contains: searchData.genre, mode: "insensitive" }
                }
            });
            return allBooks;
        } catch (error) {
            throw error;
        };
    },

    async create(parsedData) {
        try {

            const book = await prisma.book.create({ data: parsedData });

            return book;
        } catch (error) {
            throw error;
        };
    },

    async getById(bookId) {
        try {
            const book = await prisma.book.findUnique({
                where: { id: bookId },
                include: {
                    critics: {
                        include: {
                            critic: true
                        }
                    }
                }
            });

            return book;
        } catch (error) {
            throw error;
        };
    },

    async attach(parsedData) {
        
        try {
            const result = await prisma.bookCritic.create({
                data: {
                    bookId: parsedData.bookId,
                    criticId: parsedData.criticId,
                    review: parsedData.reviewContent
                }
            });

            return result;
        } catch (error) {
            throw error;
        };
    },

    async delete(bookId, userId) {

        try {
            await prisma.book.delete({
                where: {
                    id: bookId,
                    userId: userId
                }
            });
        } catch (error) {
            throw error;
        };

    },

    async edit(bookId, userId, editedBookData) {
        try {
          await prisma.book.update({
            where: {
                id: bookId,
                userId: userId
            },
            data: { ...editedBookData }
          })  
        } catch (error) {
            throw error;
        };
    }
}