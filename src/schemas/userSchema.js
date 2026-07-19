import * as z from "zod";

export const createUserSchema = z.object({
    email: z.email({ error: "Invalid email address" })
        .min(10, { error: "Email must be at least 10 characters long" })
        .trim(),
    password: z.string()
        .min(6, { error: "Password must be at least 6 characters long" })
        .regex(/^[A-Za-z0-9]+$/, { error: "Password must contains at least none letter and one number" }),
    repeatPassword: z.string()
}).refine((data) => data.password === data.repeatPassword, {
    error: "Passwords do not match!",
    path: ["repeatPassword"]
}).transform(({ repeatPassword, ...data }) => data);