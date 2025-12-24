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
  cleanNestedObject,
  cleanString,
  convertIntoArray,
  removeExtraSpaces,
} from "../utils/helper.functions";
import { ApiError } from "../utils/customError";

// controller to get all the recipes
export const getAllRecipe = async (req: Request, res: Response) => {
  // model function to get all the recipes from recipe table
  const recipes = await getAllRecipes();

  // after getting all the recipes
  // send  all recipes to the user
  return res.json({
    data: recipes,
    messgae: "all recipes fetched successfully",
  });
};

// controller to create the the new recipe
export const createRecipe = async (req: Request, res: Response) => {
  console.log("recipe data : ", req.body);
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

  // if validation failed then throw the custom error to user
  if (!parsedBodyObject.success) {
    //throw errors
    throw new ApiError(parsedBodyObject.error.issues[0].message, 400);
  }

  // if validation pass then create new recipe
  // call createNewRecipe model function to create recipe in recipe table
  const result = await createNewRecipe({
    ...parsedBodyObject.data,
  });

  // after creating recipe send the success response data and recipe data to user
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

// controller to get one single recipe data
export const getOneRecipe = async (req: Request, res: Response) => {
  //check if recipeId is attached with user request or not
  const id = req.params.recipeId;
  // if recipeId is not attached then throw the custom error to user
  if (!id) {
    throw new ApiError("Recipe id is required", 404);
  }
  // if recipe id is present then call getSingleRecipe model function to fetch recipe data from database
  const recipe = await getSingleRecipe(id);

  // then return the recipe data to user
  return res.json({ data: recipe, msg: "fetch recipe successfully" });
};
