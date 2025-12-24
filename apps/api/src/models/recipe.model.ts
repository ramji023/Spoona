import { Prisma, prisma, PrismaClient } from "@repo/database";
import { CreateRecipeInput } from "../validations/recipe.validation";
import { ApiError } from "../utils/customError";

// export const createNewRecipe = async (userData: CreateRecipeInput) => {
//   try {
//     const recipe = await prisma.recipe.create({
//       data: {
//         userId: userData.userId,
//         title: userData.title,
//         description: userData.description,
//         cookTime: userData.cookTime,
//         prepTime: userData.prepTime,
//         imageUrl: userData.imageUrl,
//         tags: userData.tags,
//         cuisines: userData.cuisines,
//         categories: userData.categories,
//         ingredients: {
//           create: userData.ingredients.map((ingredient) => ({
//             name: ingredient.name,
//             quantity: ingredient.quantity,
//           })),
//         },
//         instructions: {
//           create: userData.instructions.map((instruction) => ({
//             step: instruction.step,
//           })),
//         },
//       },
//     });
//     return recipe;
//   } catch (err) {
//     console.log("err : ", err);
//   }
// };

// write model

// write model function to create the new recipe in recipe table
export const createNewRecipe = async (
  userData: CreateRecipeInput,
  client: Prisma.TransactionClient | PrismaClient = prisma
) => {
  try {
    return client.recipe.create({
      data: {
        userId: userData.userId,
        title: userData.title,
        description: userData.description,
        cookTime: userData.cookTime,
        prepTime: userData.prepTime,
        imageUrl: userData.imageUrl,
        tags: userData.diets,
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
  } catch (err) {
    console.log(err);
    throw new ApiError("Something went wrong while creating recipe", 404);
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
      tags: recipeData.diets,
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
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// model function to ge the complete recipe data for given recipe Id
export const getSingleRecipe = async (recipeId: string) => {
  try {
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
  } catch (err) {
    throw new ApiError("Something went wrong while fetching recipe data", 404);
  }
};

// model function to fetch all the recipes from recipe table
export const getAllRecipes = async () => {
  try {
    return await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        cookTime: true,
        imageUrl: true,
        tags: true,
        cuisines: true,
        categories: true,
        user: {
          select: {
            username: true,
            profileImage: true,
          },
        },
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while fetching all the recipes",
      404
    );
  }
};
