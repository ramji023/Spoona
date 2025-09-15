import { prisma } from "@repo/database";

interface CommentDataType {
  userId: string;
  recipeId: string;
  title: string;
}
// create a new comment
export const createComment = async (commentData: CommentDataType) => {
  return await prisma.comment.create({
    data: {
      userId: commentData.userId,
      recipeId: commentData.recipeId,
      title: commentData.title,
    },
  });
};
