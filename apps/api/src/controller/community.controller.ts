import { Request, Response } from "express";
import { z } from "zod";
import { createCommunityValidation } from "../validations/community.validation";
import {
  addMember,
  addRecipe,
  createNewCommunity,
  deleteMember,
  findCommunityById,
  getAllCommunities,
  getCommunity,
} from "../models/community.model";
import { createRecipeValidation } from "../validations/recipe.validation";
import { createNewRecipe } from "../models/recipe.model";
import { ApiError } from "../utils/customError";
import { prisma } from "@repo/database";
import {
  cleanNestedObject,
  convertIntoArray,
} from "../utils/helper.functions";

//write controller to create a community
export const createCommunity = async (req: Request, res: Response) => {
  // first validate the user request data
  const parsedBodyObject = createCommunityValidation.safeParse(req.body);

  // if validation failed then throw error
  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  // if pass

  //create new community
  const result = await createNewCommunity({
    ...parsedBodyObject.data,
    userId: req.user!,
  });

  // then return success response to user
  return res.json({
    data: result,
    msg: "user have created community successfully",
  });
};

/***
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// controller to fetch all  the communities saved in community table
export const fetchAllCommunities = async (req: Request, res: Response) => {
  // call model functions to fetch all the communities data from database
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

//write controller to upload a recipe on community
export const uploadOnCommunity = async (req: Request, res: Response) => {
  // console.log("hit this route");
  const communityId = req.params.communityId; // check the community id first
  // if community id is not present in client request
  if (!communityId) {
    throw new ApiError("Community id is required", 404);
  }
  // if present then verify if community id is valid or not
  const findCommunity = await findCommunityById(communityId);
  // if findCommuniy is null then throw custom error
  if (!findCommunity) {
    throw new ApiError("Community is not exist", 404);
  }
  // if id valid then proceed
  //first normalize the request data
  const normalizeObject = cleanNestedObject(req.body);
  console.log("after cleaning recipe data : ", normalizeObject);

  // after normalizing the recipe data call zod schema validation
  const parsedBodyObject = createRecipeValidation.safeParse({
    userId: req.user!,
    title: normalizeObject.title,
    description: normalizeObject.description,
    ingredients: normalizeObject.ingredients,
    instructions: normalizeObject.instructions,
    cookTime: String(
      parseInt(normalizeObject.cookHours) * 60 +
        parseInt(normalizeObject.cookMinutes)
    ),
    prepTime: String(
      parseInt(normalizeObject.prepHours) * 60 +
        parseInt(normalizeObject.prepMinutes)
    ),
    imageUrl: normalizeObject.imageUrl,
    tags: convertIntoArray(normalizeObject.tags),
    cuisines: convertIntoArray(normalizeObject.cuisines),
    categories: convertIntoArray(normalizeObject.categories),
  });
  console.log(parsedBodyObject.data);

  // if validation failed then throw custom error
  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  // write a interactive transaction when you need conditional logic or to read before writing
  const result = await prisma.$transaction(async (tx) => {
    const recipe = await createNewRecipe(
      {
        ...parsedBodyObject.data,
        userId: req.user as string,
      },
      tx
    );
    console.log("recipe is : ", recipe);
    const communityRecipe = await addRecipe(
      {
        userId: req.user as string,
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
  // get the community id from params
  const communityId = req.params.communityId;

  // check if community id is present in params or not
  // if not present then throw custom error
  if (!communityId) {
    throw new ApiError("Community Id is required", 404);
  }
  // if present then call getCommunity model function to get the community data
  const result = await getCommunity(communityId);

  // return the success response to user
  return res.json({
    data: result,
    message: "fetch single community successfully",
  });
};

//write controller to add member to a community
export const AddMembersOnCommunity = async (req: Request, res: Response) => {
  const communityId = req.params.communityId;
  // if community id is not present then throw  custom error
  if (!communityId) {
    throw new ApiError("Community Id is required", 404);
  }
  // if present then check is community id is valid or not
  const existCommunity = await findCommunityById(communityId);
  // if existeCommunity is undefined then throw custom error
  if (!existCommunity) {
    throw new ApiError("Community id is invalid", 404);
  }
  // if community exist then add member
  // add member on community
  await addMember({
    userId: req.user!,
    communityId: communityId,
  });

  return res.json({ msg: "Member has been added in community successfully" });
};

// write controller to delete member from community
export const deleteMemberOnCommunity = async (req: Request, res: Response) => {
  const communityId = req.params.communityId;
  // if community id is not present then throw  custom error
  if (!communityId) {
    throw new ApiError("Community Id is required", 404);
  }
  // if present then check is community id is valid or not
  const existCommunity = await findCommunityById(communityId);
  // if existeCommunity is undefined then throw custom error
  if (!existCommunity) {
    throw new ApiError("Community id is invalid", 404);
  }
  // if community exist then add member
  // add member on community
  await deleteMember({
    userId: req.user!,
    communityId: communityId,
  });

  return res.json({
    msg: "Member has been removed from community successfully",
  });
};
/***
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */