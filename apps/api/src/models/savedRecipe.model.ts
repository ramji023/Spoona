import { prisma } from "@repo/database";

interface recipeData {
  id?: string;
  userId: string;
  recipeId: string;
}
export const createBookmarkRecipe = async (recipeData: recipeData) => {
  return await prisma.savedRecipe.create({
    data: {
      userId: recipeData.userId,
      recipeId: recipeData.recipeId,
    },
  });
};

export const findBookmarkRecipe = async (recipeData: recipeData) => {
  return await prisma.like.findFirst({
    where: { userId: recipeData.userId, recipeId: recipeData.recipeId },
  });
};

export const deleteBookMarkedRecipe = async (recipeData: recipeData) => {
  await prisma.savedRecipe.delete({ where: { id: recipeData.id } });
};
