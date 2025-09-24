import { Request, Response } from "express";
import { noteValidation } from "../validations/recipe.validation";
import { ApiError } from "../utils/customError";
import { checkNote, createNote } from "../models/note.model";

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
  const existedNote = await checkNote(req.params.recipeId, req.user as string);

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
