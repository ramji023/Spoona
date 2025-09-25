import { Request, Response } from "express";
import { noteValidation } from "../validations/recipe.validation";
import { ApiError } from "../utils/customError";
import { checkNote, createNote, getAllNotes } from "../models/note.model";
import { z } from "zod";
//  handle user note on recipe
export const makeNote = async (req: Request, res: Response) => {
  const parsedBodyObject = noteValidation.safeParse({
    ...req.body,
    userId: req.user!,
    recipeId: req.params.recipeId,
  });

  if (!parsedBodyObject.success) {
    throw new ApiError(parsedBodyObject.error.issues[0].message, 404);
  }

  // check if user and recipe already make note
  console.log(parsedBodyObject.data);
  const existedNote = await checkNote(req.params.recipeId, req.user as string);
  console.log(existedNote);
  if (existedNote) {
    throw new ApiError("User already make note on this recipe", 404);
  }
  // create a new note
  const note = await createNote(parsedBodyObject.data);

  if (!note) {
    throw new ApiError("Something went wrong while creating your note", 404);
  }

  return res.json({
    data: { status: note.status, note: note.note },
    message: "user have created note successfully",
  });
};

export const getAllNote = async (req: Request, res: Response) => {
  const recipeId = req.params.recipeId;

  const parsedParams = z
    .object({ recipeId: z.string().uuid("Valid recipe Id is required") })
    .safeParse({ recipeId });

  if (!parsedParams.success) {
    throw new ApiError(parsedParams.error.issues[0].message, 404);
  }

  //get All the notes
  const result = await getAllNotes(recipeId);
  if (!result) {
    throw new ApiError("Something is wrong while fetching notes", 404);
  }

  return res.json({
    data: result,
    message: "User fetch All notes successfully",
  });
};
