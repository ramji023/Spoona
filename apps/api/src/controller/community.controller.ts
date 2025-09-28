import { Request, Response } from "express";
import { z } from "zod";
import { createCommunityValidation } from "../validations/community.validation";
import {
  addMember,
  addRecipe,
  createNewCommunity,
  getAllCommunities,
  getCommunity,
} from "../models/community.model";
import { createRecipeValidation } from "../validations/recipe.validation";
import { createNewRecipe } from "../models/recipe.model";
import { ApiError } from "../utils/customError";
import { prisma } from "@repo/database";
import {
  cleanArrayObjects,
  cleanString,
  removeExtraSpaces,
} from "../utils/helper.functions";

//create a community
export const createCommunity = async (req: Request, res: Response) => {
  const parsedBodyObject = createCommunityValidation.safeParse(req.body);

  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
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

  return res.json({
    data: result,
    msg: "user have created community successfully",
  });
};

export const fetchAllCommunities = async (req: Request, res: Response) => {
  const communities = await getAllCommunities();

  if (!communities) {
    throw new ApiError(
      "something went wrong while fetching all communities",
      404
    );
  }

  return res.json({
    data: communities,
    message: "Fetched All Communities successfully",
  });
};

// add member to a community
export const AddMembersOnCommunity = async (req: Request, res: Response) => {
  const parsedBodyObject = z
    .object({ communityId: z.string() })
    .safeParse({ communityId: req.params.communityId });

  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  // add member on community
  const result = await addMember({
    userId: req.user!,
    communityId: parsedBodyObject.data.communityId,
  });

  if (!result) {
    //throw error
    throw new ApiError(
      "Something went wrong while adding members to a community",
      404
    );
  }

  return res.json({ msg: "Member has been added in community successfully" });
};

// upload a recipe on community
export const uploadOnCommunity = async (req: Request, res: Response) => {
  console.log("hit this route");
  const title = removeExtraSpaces(req.body.title);
  const description = removeExtraSpaces(req.body.description);
  const ingredients = cleanArrayObjects(req.body.ingredients);
  const instructions = cleanArrayObjects(req.body.instructions);
  const prepHours = removeExtraSpaces(req.body.prepHours);
  const prepMinutes = removeExtraSpaces(req.body.prepMinutes);
  const cookHours = removeExtraSpaces(req.body.cookHours);
  const cookMinutes = removeExtraSpaces(req.body.cookMinutes);
  const imageUrl = removeExtraSpaces(req.body.imageUrl);
  const tags = cleanString(req.body.tags);
  const cuisines = cleanString(req.body.cuisines);
  const categories = cleanString(req.body.categories);

  console.log("after cleaning recipe data : ", {
    title,
    description,
    ingredients,
    instructions,
    prepHours,
    cookHours,
    cookMinutes,
    imageUrl,
    tags,
    cuisines,
    categories,
  });
  const parsedBodyObject = createRecipeValidation.safeParse({
    userId: req.user!,
    title,
    description,
    ingredients,
    instructions,
    cookTime: String(parseInt(cookHours) * 60 + parseInt(cookMinutes)),
    prepTime: String(parseInt(prepHours) * 60 + parseInt(prepMinutes)),
    imageUrl,
    tags,
    cuisines,
    categories,
  });
  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  console.log(parsedBodyObject.data);
  const result = await prisma.$transaction(async (tx) => {
    const recipe = await createNewRecipe(
      { ...parsedBodyObject.data, userId: req.user! },
      tx
    );
    console.log("recipe is : ", recipe);
    const communityRecipe = await addRecipe(
      {
        userId: req.user!,
        communityId: req.params.communityId,
        recipeId: recipe.id,
      },
      tx
    );
    console.log("community rcipe is  : ", communityRecipe);
    return { recipe, communityRecipe };
  });
  // console.log(result);
  return res.json({ msg: "Recipe has been added in community successfully" });
};

//fetch single community data
export const fetchSingleCommunity = async (req: Request, res: Response) => {
  const communityId = req.params.communityId;

  const result = await getCommunity(communityId);

  return res.json({
    data: result,
    message: "fetch single community successfully",
  });
};
