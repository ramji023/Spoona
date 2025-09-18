import { z } from "zod";

// check recipe data
const ingredientsSchema = z.object({
  name: z.string("Ingredient name is required"),
  quantity: z.string("Ingredient quantity is required"),
});

const instructionSchema = z.object({
  step: z.string("Instruction step is required"),
});

export const createRecipeValidation = z.object({
  recipeId: z.string().uuid("Invalid recipe Id type").optional(),
  userId: z.string().uuid("Invalid user Id type"),
  title: z.string("Title is required").max(20, "Title is too long"),
  description: z
    .string("Description is required")
    .max(50, "Description is too long"),
  ingredients: z.array(ingredientsSchema, "Ingredients object is not valid"),
  instructions: z.array(instructionSchema, "Instruction object is not valid"),
  cookTime: z.string("Cook time is required").max(10, "Cook time is too long"),
  prepTime: z.string("Prep time is required").max(10, "Prep time is too long"),
  imageUrl: z.string("Image URL is required").url("Invalid image URL"),
  tags: z.array(
    z.string("Tag must be a string"),
    "Tags must be an array of strings"
  ),
});

export type CreateRecipeInput = z.infer<typeof createRecipeValidation>;

// check like data
export const likeRecipeValidation = z.object({
  recipeId: z.string().uuid("Valid recipe Id is required"),
  status: z.enum(["like", "dislike"], "Must be 'like' or 'dislike'"),
});

// check comment data
export const commentRecipeValidation = z.object({
  recipeId: z.string().uuid("Valid recipe Id is required"),
  title: z.string("Enter a valid comment"),
});
