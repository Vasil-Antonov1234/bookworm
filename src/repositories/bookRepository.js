import fs from "fs/promises";
import { prisma } from "../lib/prisma.js"

async function readData() {

    try {
        
        const dataJson = await fs.readFile("./src/db.json", { encoding: "utf-8" });
        const data = JSON.parse(dataJson);

        return data;
    } catch (error) {
        throw error
    }

}

async function writeData(newData) {

    try {
        await fs.writeFile("./src/db.json", JSON.stringify(newData, null, 2), { encoding: "utf-8" });
    } catch (error) {
        throw error;
    };
}

export default {
    async getAll(searchData) {
        const data = await readData();

        const allBooks = data.books;

        let filteredBooks = allBooks;

        if (searchData && searchData.year) {
            filteredBooks = allBooks.filter((x) => x.year === searchData.year);
        }

        if (searchData && searchData.title) {
            filteredBooks = filteredBooks.filter((x) => x.title.toLowerCase().includes(searchData.title.toLocaleLowerCase()));
        }

        if (searchData && searchData.genre) {
            filteredBooks = filteredBooks.filter((x) => x.genre.toLocaleLowerCase().includes(searchData.genre.toLocaleLowerCase()));
        }

        return filteredBooks;
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
            const data = await readData();

            const book = data.books.find((x) => x.id === bookId);

            return book;
        } catch (error) {
            throw error;
        };
    }
}