import { z } from "zod";

//check signup data
export const loggerValidation = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .min(3, "Password is  too sort")
    .max(8, "Password is too long"),
});

// check profile data
export const profileDataValidation = z.object({
  username: z.string().max(10,"Username is too long").min(5,"Username is too sort").optional(),
  profileImage: z.string().url("Invalid profile image url").optional(),
  bio: z.string().max(200,"Bio is too long").optional(),
});

// check profile image
export const imageValidation = z.object({
  profileImage: z.string().url("Invalid profile image url"),
});
