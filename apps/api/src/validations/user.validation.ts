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
  username: z.string().optional(),
  profileImage: z.string().url("Invalid profile image url").optional(),
  bio: z.string().optional(),
});

// check profile image
export const imageValidation = z.object({
  profileImage: z.string().url("Invalid profile image url"),
});
