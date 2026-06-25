import fs from "fs/promises";
import { v4 as uuidV4 } from "uuid";

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
    async getAll() {
        const data = await readData();

        return data.books;
    },

    async create(newBook) {
        try {
            const data = await readData();

            newBook.id = uuidV4();

            data.books.push(newBook);

            await writeData(data);
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