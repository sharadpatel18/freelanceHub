import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty("name is required"),
  email: z.string().email().nonempty("email is required"),
  password: z.string().min(8).max(32).nonempty("password is required"),
});
