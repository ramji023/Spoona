import { prisma } from "@repo/database";

interface LikeDataType {
  id?: string;
  userId: string;
  recipeId: string;
  status: "like" | "dislike";
}

// create  like status
export const createLike = async (likeData: LikeDataType) => {
  return await prisma.like.create({
    data: {
      userId: likeData.userId,
      recipeId: likeData.recipeId,
      status: likeData.status,
    },
  });
};

// update  like status
export const updateLike = async (likeData: LikeDataType) => {
  return await prisma.like.update({
    where: { id: likeData.id },
    data: { status: likeData.status },
  });
};

// find like row
export const findLike = async ({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) => {
  return await prisma.like.findFirst({
    where: {
      userId,
      recipeId,
    },
  });
};
