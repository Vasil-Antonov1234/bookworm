import fs from "fs/promises";

async function readData() {

    try {
        const dataJson = await fs.readFile("./src/db.json", { encoding: "utf-8" });
        const data = JSON.parse(dataJson);

        return data;
    } catch (error) {
        throw error
    }

}

export default {
    async getAll() {
        const data = await readData();

        return data.books;
    },

    async create(newBook) {
        try {
            const data = await readData();

            data.books.push(newBook);

            await fs.writeFile("./src/db.json", JSON.stringify(data));
        } catch (error) {
            throw error;
        };
    }
}