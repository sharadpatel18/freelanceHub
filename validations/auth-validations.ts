import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty("name is required"),
  email: z.string().email().nonempty("email is required"),
  password: z.string().min(8).max(32).nonempty("password is required"),
});

export const profileSchema = z.object({
  username: z.string().nonempty("username is required"),
  profileImage: z.string().nonempty("profile image is required"),
  about: z.string().nonempty("about is required"),
  location: z.string().nonempty("location is required"),
  timezone: z.string().nonempty("timezone is required"),
  bio: z.string().nonempty("bio is required"),
  skills: z.array(z.string()).nonempty("skills is required"),
  languages: z.array(z.string()).nonempty("languages is required"),
  hourlyRate: z
    .number()
    .positive("hourly rate must be a positive number")
    .nonoptional("hourly rate is required"),
  isVerified: z.boolean().default(false),
  isEmailVerified: z.boolean().default(false),
});
