import { prisma } from "@repo/database";
import { CreateRecipeInput } from "../validations/recipe.validation";

export const createNewRecipe = async (userData: CreateRecipeInput) => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        userId: userData.userId,
        title: userData.title,
        description: userData.description,
        cookTime: userData.cookTime,
        prepTime: userData.prepTime,
        imageUrl: userData.imageUrl,
        tags: userData.tags,
        cuisines: userData.cuisines,
        categories: userData.categories,
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
    });
    return recipe;
  } catch (err) {
    console.log("err : ", err);
  }
};

// update the recipe
export const updateNewRecipe = async (recipeData: CreateRecipeInput) => {
  const recipe = await prisma.recipe.update({
    where: { id: recipeData.recipeId, userId: recipeData.userId },
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
  // console.log("updated recipe data :", recipe);
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
    select: {
      title: true,
      description: true,
      cookTime: true,
      prepTime: true,
      imageUrl: true,
      ingredients: {
        select: {
          name: true,
          quantity: true,
        },
      },
      instructions: {
        select: {
          step: true,
        },
      },
      user: {
        select: {
          username: true,
          profileImage: true,
        },
      },
    },
  });
};

// get all recipes
export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    select: {
      title: true,
      description: true,
      cookTime: true,
      prepTime: true,
      imageUrl: true,
      tags: true,
      ingredients: {
        select: {
          name: true,
          quantity: true,
        },
      },
      instructions: {
        select: {
          step: true,
        },
      },
    },
  });
};
