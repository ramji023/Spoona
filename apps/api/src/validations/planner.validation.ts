import {z} from "zod"

export const plannerValidation = z.object({
  date: z.coerce.date(), // Simple, uses default error messages
  type: z.enum(["Breakfast", "Lunch", "Snacks", "Dinner"]),
  foodUrl: z.string().max(100, "Note is too long").optional(),
  food: z.string().uuid("Enter valid recipe Id").optional(),
});