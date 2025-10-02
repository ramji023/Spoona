import z from "zod";

export const plannerValidation = z.object({
  date: z.date("Enter Valid Date"),
  type: z.enum(["Breakfast | Lunch | Snacks | Dinner"]),
  recipeNote: z
    .string("Enter valid Note")
    .max(50, "note is too long")
    .optional(),
  recipeId: z.string().uuid("Enter valid recipe Id").optional(),
});
