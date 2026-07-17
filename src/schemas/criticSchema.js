import * as z from "zod";

export const createCriticSchema = z.object({
    fullName: z.string()
        .min(5, { message: "Name nust be at least 5 characters long" })
        .regex(/^[A-Za-z ]+$/, { message: "Name can ony contains letters and spaces" }),
    age: z.coerce.number()
        .min(1, { message: "Age must be at least 1" })
        .max(120, { message: "Age must be at most 120" }),
    placeOfBorn: z.string()
        .min(10, { message: "Place of born must be at least 10 characters long" })
        .regex(/[A-Za-z0-9 ]+$/, { message: "Place of born can only contains letters, numbers and spaces" }),
    image: z.string()
        .regex(/^https?:\/\//, { message: "Image URL must starts with http:// or https://" })
})