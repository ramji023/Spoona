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
  return await prisma.savedRecipe.findFirst({
    where: { userId: recipeData.userId, recipeId: recipeData.recipeId },
  });
};

export const deleteBookMarkedRecipe = async (id: string) => {
  return await prisma.savedRecipe.delete({ where: { id: id } });
};

export const fetchAllBookmarkRecipe = async (id: string) => {
  return await prisma.savedRecipe.findMany({
    where: { userId: id },
    select: {
      recipe: {
        select: {
          id: true,
          title: true,
          description: true,
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
      },
    },
  });
};
