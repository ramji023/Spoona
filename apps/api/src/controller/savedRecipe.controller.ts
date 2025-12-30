import { Request, Response } from "express";
import { z } from "zod";
import {
  createBookmarkRecipe,
  deleteBookMarkedRecipe,
  fetchAllBookmarkRecipe,
  findBookmarkRecipe,
} from "../models/savedRecipe.model";
import { ApiError } from "../utils/customError";

// write controller to toggle bookmark recipe
export const toggleBookMarkRecipe = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;

  // check wheather user is already saved this recipe or not
  const likeDoc = await findBookmarkRecipe({
    recipeId: recipeId,
    userId: req.user!,
  });

  // if user is already saved then delete that row
  if (likeDoc?.id) {
    // update the like status
    await deleteBookMarkedRecipe(likeDoc?.id);

    // return  success response
    return res.json({msg: "Recipe removed from your collection" });
  }

  // and  if user is not saved yet then save it
  //create the save status
  await createBookmarkRecipe({
    userId: req.user!,
    recipeId: recipeId,
  });

  // return success response to user
  return res.json({ msg: "Recipe move into your collection" });
};

// write controller to fetch all saved recipes by a user
export const getAllSavedRecipe = async (req: Request, res: Response) => {
  // console.log("all saved recipe controller hit");
  // call model function to get all the saved recipe from savedRecipe table
  const savedRecipes = await fetchAllBookmarkRecipe(req.user as string);

  // return the success response to user
  return res.json({
    data: savedRecipes,
    message: "user fetch all saved recipe",
  });
};
