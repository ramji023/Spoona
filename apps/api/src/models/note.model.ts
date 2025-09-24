import { prisma, User } from "@repo/database";
import { NoteInput } from "../validations/recipe.validation";

export async function createNote(noteData: NoteInput) {
  return await prisma.note.create({
    data: {
      userId: noteData.userId,
      recipeId: noteData.recipeId,
      status: noteData.status,
      note: noteData.note,
    },
  });
}

export async function checkNote(recipeId: string, userId: string) {
  return await prisma.note.findFirst({
    where: { recipeId: recipeId, userId: userId },
  });
}
