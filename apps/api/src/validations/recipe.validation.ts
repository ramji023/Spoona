import { z } from "zod";

// check recipe data
const ingredientsSchema = z.object({
  name: z.string("Ingredient name is required"),
  quantity: z.string("Ingredient quantity is required"),
});

const instructionSchema = z.object({
  step: z.string("Instruction step is required"),
});


// write zod schema validation  to check user recipe data
export const createRecipeValidation = z.object({
  recipeId: z
    .string("invalid recipe id")
    .uuid("Invalid recipe Id type")
    .optional(),
  userId: z.string("Invalid User id").uuid("Invalid user Id type"),
  title: z.string("Title is required").max(50, "Title is too long"),
  description: z
    .string("Description is required")
    .max(100, "Description is too long"),
  ingredients: z.array(ingredientsSchema, "Ingredients object is not valid"),
  instructions: z.array(instructionSchema, "Instruction object is not valid"),
  cookTime: z.string("Cook time is required").max(10, "Cook time is too long"),
  prepTime: z.string("Prep time is required").max(10, "Prep time is too long"),
  imageUrl: z.string("Image URL is required").url("Invalid image URL"),
  diets: z.array(
    z.string("Diet must be a string"),
    "Diets must be an array of strings"
  ),
  cuisines: z.array(
    z.string("Cuisine must be a string"),
    "Cuisines must be an array of strings"
  ),
  categories: z.array(
    z.string("Category must be a string"),
    "Categories must be an array of strings"
  ),
});

export type CreateRecipeInput = z.infer<typeof createRecipeValidation>; // infer te type of createRecipe validation

export const noteValidation = z.object({
  userId: z.string().uuid("Valid recipe Id is required"),
  recipeId: z.string().uuid("Valid recipe Id is required"),
  status: z.enum(["like", "dislike"], "Must be 'like' or 'dislike'"),
  note: z.string("Enter a valid Note").optional(),
});

export type NoteInput = z.infer<typeof noteValidation>;
