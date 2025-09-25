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

export async function getAllNotes(recipeId: string) {
  try {
    return await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: {
        notes: {
          select: {
            status: true,
            note: true,
            user: {
              select: {
                username: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}
