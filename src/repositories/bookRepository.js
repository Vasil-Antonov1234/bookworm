import fs from "fs/promises";

export default {
    async getAll() {
        
        try {
            const books = await fs.readFile("./src/db.json", { encoding: "utf-8"});

            return JSON.parse(books);
        } catch (error) {
            throw error
        }
    }
}