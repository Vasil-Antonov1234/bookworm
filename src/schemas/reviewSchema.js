import * as z from "zod";

export const createReviewSchema = z.object({
    criticId: z.coerce.number(),
    reviewContent: z.string()
        .min(10, { error: "Review must be at least 10 characters long" })
        .regex(/^[A-Za-z0-9 \.!?]+$/, { error: "Review cannot contains special characters" }),
    bookId: z.coerce.number()
})