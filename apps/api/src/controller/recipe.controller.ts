import { Request, Response } from "express";
import {
  createNewRecipe,
  getAllRecipes,
  deleteRecipe,
  getSingleRecipe,
  updateNewRecipe,
} from "../models/recipe.model";
import { createRecipeValidation } from "../validations/recipe.validation";

// fetch all the recipe controller
export const getAllRecipe = async (req: Request, res: Response) => {
  const recipes = await getAllRecipes();
  if (!recipes) {
    // throw error
  }

  return res.json({
    data: recipes,
    messgae: "all recipes fetched successfully",
  });
};

// create Recipe controller
export const createRecipe = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedBodyObject = createRecipeValidation.safeParse(body);

  if (!parsedBodyObject.success) {
    //throw errors
    return;
  }

  // create the recipe
  const result = await createNewRecipe({
    ...parsedBodyObject.data,
  });

  if (!result) {
    return;
    // throw error
  }

  res.json({ msg: "new recipe has been created successfully" });
};

// delete a Recipe controller
export const deleteARecipe = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteRecipe(id);

  res.json({ msg: "recipe has been deleted successfully" });
};

// update recipe controller
export const updateRecipe = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedBodyObject = createRecipeValidation.safeParse(body);

  if (!parsedBodyObject.success) {
    //throw errors
    return;
  }

  // create the recipe
  const result = await updateNewRecipe({
    ...parsedBodyObject.data,
  });

  if (!result) {
    return;
    // throw error
  }

  res.json({ msg: "Recipe has been updated successfully" });
};

// get single recipe controller
export const getOneRecipe = async (req: Request, res: Response) => {
  const id = req.params.id;
  const recipe = await getSingleRecipe(id);
  if (!recipe) {
    //throw err
    return;
  }

  return res.json({ data: recipe, msg: "fetch recipe successfully" });
};
