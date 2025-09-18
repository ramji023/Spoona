import { Request, Response } from "express";
import { z } from "zod";
import { createCommunityValidation } from "../validations/community.validation";
import {
  addMember,
  addRecipe,
  createNewCommunity,
} from "../models/community.model";
import { createRecipeValidation } from "../validations/recipe.validation";
import { createNewRecipe } from "../models/recipe.model";

//create a community
export const createCommunity = async (req: Request, res: Response) => {
  const parsedBodyObject = createCommunityValidation.safeParse(req.body);

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  //create new community
  const result = await createNewCommunity({
    ...parsedBodyObject.data,
    userId: req.user!,
  });

  if (!result) {
    //throw error
    return;
  }

  return res.json({ msg: "user have created community successfully" });
};

// add member to a community
export const AddMembersOnCommunity = async (req: Request, res: Response) => {
  const parsedBodyObject = z
    .object({ communityId: z.string() })
    .safeParse({ communityId: req.params.communityId });

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  // add member on community
  const result = await addMember({
    userId: req.user!,
    communityId: parsedBodyObject.data.communityId,
  });

  if (!result) {
    //throw error
    return;
  }

  return res.json({ msg: "Member has been added in community successfully" });
};

// upload a recipe on community
export const uploadOnCommunity = async (req: Request, res: Response) => {
  const parsedBodyObject = createRecipeValidation.safeParse(req.body);

  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  const result = await createNewRecipe({
    ...parsedBodyObject.data,
    userId: req.user!,
  });

  if (!result) {
    //throw error
    return;
  }

  // const communityRecipe = await addRecipe({
  //   userId: req.user!,
  //   communityId: req.params.communityId,
  //   recipeId: result.id,
  // });
  // if (!communityRecipe) {
  //   //process failed
  //   return;
  // }

  return res.json({ msg: "Member has been added in community successfully" });
};
