import z from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(3).max(32),
    lastName: z.string().min(3).max(32),
    username: z.string().min(3).max(32),
    email: z.string().email().nonempty("email is required"),
    password: z.string().min(8).max(32).nonempty("password is required"),
})
