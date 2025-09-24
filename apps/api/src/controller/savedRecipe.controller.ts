import { Request, Response } from "express";
import { z } from "zod";
import {
  createBookmarkRecipe,
  deleteBookMarkedRecipe,
  findBookmarkRecipe,
} from "../models/savedRecipe.model";
import { ApiError } from "../utils/customError";

export const toggleBookMarkRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;

  const parsedBodyObject = z
    .object({ recipeId: z.uuid("invalid RecipeId") })
    .safeParse({ recipeId });

  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  const likeDoc = await findBookmarkRecipe({
    ...parsedBodyObject.data,
    userId: req.user!,
  });
  if (likeDoc?.id) {
    // update the like status
    const result = await deleteBookMarkedRecipe(likeDoc?.id);
    if (!result) {
      //throw error
      throw new ApiError("something went wrong while deleting the recipe", 404);
    }
    // return response
    return res.json({ msg: "User successfully Bookmarked recipe" });
  }

  //create the like status
  const result = await createBookmarkRecipe({
    userId: req.user!,
    recipeId: recipeId,
  });

  if (!result) {
    //throw error
    throw new ApiError("something went wrong while bookmark the recipe", 404);
  }

  // return response
  return res.json({ msg: "User successfully Bookmarked recipe" });
};
