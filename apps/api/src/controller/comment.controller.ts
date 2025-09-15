import { Request, Response } from "express";
import { commentRecipeValidation } from "../validations/recipe.validation";
import { createComment } from "../models/comment.model";

// make comment controller
export const makeComment = async (req: Request, res: Response) => {
  const parsedBodyObject = commentRecipeValidation.safeParse({
    title: req.body.content,
    recipeId: req.params.recipeId,
  });

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  // create a comment
  const result = await createComment({
    ...parsedBodyObject.data,
    userId: req.user!,
  });

  if (!result) {
    //throw error
  }

  return res.json({ msg: "User made comment successfully" });
};
