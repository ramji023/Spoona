import { prisma } from "@repo/database";
import { CreateRecipeInput } from "../validations/recipe.validation";

export const createNewRecipe = async (userData: CreateRecipeInput) => {
  const recipe = await prisma.recipe.create({
    data: {
      userId: userData.userId,
      title: userData.title,
      description: userData.description,
      cookTime: userData.cookTime,
      prepTime: userData.prepTime,
      imageUrl: userData.imageUrl,
      tags: userData.tags,
      ingredients: {
        create: userData.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
        })),
      },
      instructions: {
        create: userData.instructions.map((instruction) => ({
          step: instruction.step,
        })),
      },
    },
    include: {
      ingredients: true,
      instructions: true,
    },
  });

  return recipe;
};

// update the recipe
export const updateNewRecipe = async (recipeData: CreateRecipeInput) => {
  const recipe = await prisma.recipe.update({
    where: { id: recipeData.userId },
    data: {
      title: recipeData.title,
      description: recipeData.description,
      cookTime: recipeData.cookTime,
      prepTime: recipeData.prepTime,
      imageUrl: recipeData.imageUrl,
      tags: recipeData.tags,
      ingredients: {
        deleteMany: {},
        create: recipeData.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
        })),
      },
      instructions: {
        deleteMany: {},
        create: recipeData.instructions.map((instruction) => ({
          step: instruction.step,
        })),
      },
    },
    include: {
      ingredients: true,
      instructions: true,
    },
  });

  return recipe;
};

// delete the recipe
export const deleteRecipe = async (recipeId: string) => {
  return await prisma.recipe.delete({
    where: { id: recipeId },
  });
};

// get single recipe
export const getSingleRecipe = async (recipeId: string) => {
  return await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};

// get all recipes
export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};
