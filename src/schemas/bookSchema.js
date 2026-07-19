import * as z from "zod";

export const createBookSchema = z.object({
    title: z.string()
        .min(5, { error: "Title must be at least 5 characters long" })
        .regex(/^[A-Za-z0-9 ]+$/, { error: "Title can only contains letters, numbers and spaces" }),
    category: z.enum(["novel", "poetry", "biography", "non-fiction", "short-story"], { error: "Please select a category from the list" }),
    genre: z.string()
        .min(5, { error: "Genre must be at least 5 characters long" })
        .regex(/^[A-Za-z0-9 ]+$/, { error: "Genre can only contains letters, numbers and spaces" }),
    author: z.string()
        .min(5, { error: "Author name must be at least 5 characters long" })
        .regex(/^[A-Za-z0-9 ]+$/, { error: "Author name can only contains letters, numbers and spaces" }),
    year: z.coerce.number()
        .min(1900, { error: "Year must be greater than or equal to 1900" })
        .max(new Date().getFullYear(), { error: `Year must be less than or equal to ${new Date().getFullYear()}` }),
    imageUrl: z.string()
        .regex(/^https?:\/\//, { error: "Image URL must starts with http:// or https://" }),
    rating: z.coerce.number()
        .min(0, { error: "Rating must be at least 0" })
        .max(10, { error: "Rating must be at most 10" }),
    description: z.string()
        .min(20, { error: "Description must be at least 20 characters long." })
        .regex(/^[A-Za-z0-9 ]+$/, { error: "Description can only contains letters, numbers and spaces" }),
})