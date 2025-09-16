import { Request, Response } from "express";
import { z } from "zod";
import {
  createBookmarkRecipe,
  deleteBookMarkedRecipe,
  findBookmarkRecipe,
} from "../models/savedRecipe.model";

export const toggleBookMarkRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;

  const parsedBodyObject = z
    .object({ recipeId: z.uuid("invalid RecipeId") })
    .safeParse({ recipeId });

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  const likeDoc = await findBookmarkRecipe({
    ...parsedBodyObject.data,
    userId: req.user!,
  });
  if (likeDoc?.id) {
    // update the like status
    const result = await deleteBookMarkedRecipe({
      userId: req.user!,
      recipeId: recipeId,
    });
  }

  //create the like status
  const result = await createBookmarkRecipe({
    userId: req.user!,
    recipeId: recipeId,
  });

  if (!result) {
    //throw error
    return;
  }

  // return response
};
