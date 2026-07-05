import { prisma } from "../lib/prisma.js"

export default {
    async getAll(searchData = {}) {
        
        try {

            // TODO implement database filtering instead feltering in memory
            
            const allBooks = await prisma.book.findMany({
                where: {
                    year: searchData.year || undefined, 
                    title: { contains: searchData.title, mode: "insensitive" },
                    genre: { contains: searchData.genre, mode: "insensitive" }
                }
            });
        
            // let filteredBooks = allBooks;
    
            // if (searchData && searchData.year) {
            //     filteredBooks = allBooks.filter((x) => x.year === searchData.year);
            // }
    
            // if (searchData && searchData.title) {
            //     filteredBooks = filteredBooks.filter((x) => x.title.toLowerCase().includes(searchData.title.toLocaleLowerCase()));
            // }
    
            // if (searchData && searchData.genre) {
            //     filteredBooks = filteredBooks.filter((x) => x.genre.toLocaleLowerCase().includes(searchData.genre.toLocaleLowerCase()));
            // }
    
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
                include: { critics: true }
            });

            return book;
        } catch (error) {
            throw error;
        };
    },

    async attach(bookId, criticId) {
        
        try {
            const result = await prisma.book.update({
                where: {id: bookId},
                data: {
                    critics: {
                        connect: {id: criticId}
                    }
                }
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}