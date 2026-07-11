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

    async create(newBook) {
        try {

            const book = await prisma.book.create({ data: newBook });

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

    async attach(bookId, criticId, reviewContent) {
        
        try {
            const result = await prisma.bookCritic.create({
                data: {
                    bookId: bookId,
                    criticId: criticId,
                    review: reviewContent
                }
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}