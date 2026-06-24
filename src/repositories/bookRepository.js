import fs from "fs/promises";

export default {
    async getAll() {
        
        try {
            const dataJson = await fs.readFile("./src/db.json", { encoding: "utf-8"});
            const data = JSON.parse(dataJson);

            return data.books;
        } catch (error) {
            throw error
        }
    }
}