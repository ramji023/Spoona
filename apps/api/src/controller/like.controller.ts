import { Request, Response } from "express";
import { likeRecipeValidation } from "../validations/recipe.validation";
import { createLike, findLike, updateLike } from "../models/like.model";

// user like operation
export const toggleLikeRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;
  const status = req.query.status ? "like" : "dislike";

  const parsedBodyObject = likeRecipeValidation.safeParse({ status, recipeId });

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  const likeDoc = await findLike({
    ...parsedBodyObject.data,
    userId: req.user!,
  });
  if (likeDoc?.id) {
    // update the like status
    const result = await updateLike({
      userId: req.user!,
      recipeId: recipeId,
      status: status,
    });
    if (!result) {
      // throw error
      return;
    }
  }

  //create the like status
  const result = await createLike({
    userId: req.user!,
    recipeId: recipeId,
    status: status,
  });

  if (!result) {
    //throw error
    return;
  }

  // return response
};
