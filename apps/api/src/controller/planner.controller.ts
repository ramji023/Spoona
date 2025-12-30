import { Request, Response } from "express";
import { plannerValidation } from "../validations/planner.validation";
import { ApiError } from "../utils/customError";
import { createPlanner, fetchPlanner } from "../models/planner.model";
import { isValidRecipeId } from "../models/recipe.model";

// write controller to make planner
export async function makePlanner(req: Request, res: Response) {
  const userId = req.user; // store user id

  // call zod schema to validate user data
  const parsedBodyObject = plannerValidation.safeParse(req.body);

  // if validation failed then throw custom error
  if (!parsedBodyObject.success) {
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  // if user pass recipe id in food then check it is existed or not
  if (parsedBodyObject.data.food) {
    const recipe = isValidRecipeId(parsedBodyObject.data.food);
    if (!recipe) {
      throw new ApiError("Recipe Id is invalid", 404);
    }
  }
  // if validation pass then create planner
  const planner = await createPlanner({
    ...parsedBodyObject.data,
    userId: userId as string,
  });
  console.log("final plannner data in database : ", planner);
  // return success response to user
  return res.json({ msg: "Planner has been created successfully" });
}

// controller to fetch all the planner data
export const fetchPlannerData = async (req: Request, res: Response) => {
  const userId = req.user; // get the user id from auth middleware

  // call model function to fetch all the planners of that user
  const planner = await fetchPlanner(userId as string);

  // then send success response to user
  return res.json({ msg: "Planner data fetched successfully.", data: planner });
};
