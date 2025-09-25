import { Request, Response } from "express";
import {
  createNewRecipe,
  getAllRecipes,
  deleteRecipe,
  getSingleRecipe,
  updateNewRecipe,
} from "../models/recipe.model";
import { createRecipeValidation } from "../validations/recipe.validation";
import {
  cleanArray,
  cleanArrayObjects,
  cleanString,
  removeExtraSpaces,
} from "../utils/helper.functions";
import { ApiError } from "../utils/customError";

// fetch all the recipe controller
export const getAllRecipe = async (req: Request, res: Response) => {
  const recipes = await getAllRecipes();
  if (recipes.length === 0) {
    // throw error
    throw new ApiError("There is no recipes", 400);
  }

  return res.json({
    data: recipes,
    messgae: "all recipes fetched successfully",
  });
};

// create Recipe controller
export const createRecipe = async (req: Request, res: Response) => {
  console.log("recipe data : ", req.body);
  //first normalize the request data
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

  console.log("after cleaning recipe data : ",{title,description,ingredients,instructions,prepHours,cookHours,cookMinutes,imageUrl,tags,cuisines,categories})
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
   console.log(parsedBodyObject.data)
  if (!parsedBodyObject.success) {
    //throw errors
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  // create the recipe
  const result = await createNewRecipe({
    ...parsedBodyObject.data,
  });

  if (!result) {
    // throw error
    throw new ApiError("Something is wrong while creating new recipe", 404);
  }

  res.json({ data: result, msg: "new recipe has been created successfully" });
};

// delete a Recipe controller
export const deleteARecipe = async (req: Request, res: Response) => {
  const id = req.params.recipeId;
  console.log(id);
  const deletedRecipe = await deleteRecipe(id);
  console.log("deleted recipe data is : ", deletedRecipe);

  res.json({ msg: "recipe has been deleted successfully" });
};

// update recipe controller
export const updateRecipe = async (req: Request, res: Response) => {
  //first normalize the request data
  const title = removeExtraSpaces(req.body.title);
  const description = removeExtraSpaces(req.body.description);
  const ingredients = cleanArrayObjects(req.body.ingredients);
  const instructions = cleanArrayObjects(req.body.instructions);
  const cookTime = removeExtraSpaces(req.body.cookTime);
  const prepTime = removeExtraSpaces(req.body.prepTime);
  const imageUrl = removeExtraSpaces(req.body.imageUrl);
  const tags = cleanArray(req.body.tags);
  console.log({
    userId: req.user,
    recipeId: req.params.recipeId,
    title,
    description,
    ingredients,
    instructions,
    cookTime,
    prepTime,
    imageUrl,
    tags,
  });
  const parsedBodyObject = createRecipeValidation.safeParse({
    recipeId: req.params.recipeId,
    userId: req.user!,
    title,
    description,
    ingredients,
    instructions,
    cookTime,
    prepTime,
    imageUrl,
    tags,
  });

  if (!parsedBodyObject.success) {
    //throw error
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  // update the recipe
  const result = await updateNewRecipe({
    ...parsedBodyObject.data,
  });

  // if (!result) {
  //   return;
  //   // throw error
  // }
  res.json({ data: result, msg: "Recipe has been updated successfully" });
};

// get single recipe controller
export const getOneRecipe = async (req: Request, res: Response) => {
  const id = req.params.recipeId;
  const recipe = await getSingleRecipe(id);
  if (!recipe) {
    //throw err
    throw new ApiError("RecipeId is Invalid", 400);
  }
  return res.json({ data: recipe, msg: "fetch recipe successfully" });
};
