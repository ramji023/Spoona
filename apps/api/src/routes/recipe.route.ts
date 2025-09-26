import express from "express";
import {
  getAllRecipe,
  createRecipe,
  deleteARecipe,
  updateRecipe,
  getOneRecipe,
} from "../controller/recipe.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { getAllNote, makeNote } from "../controller/note.controller";
import {
  getAllSavedRecipe,
  toggleBookMarkRecipe,
} from "../controller/savedRecipe.controller";
const router: express.Router = express.Router();

router.route("/savedRecipe").all(AuthMiddleware).get(getAllSavedRecipe);
router.route("/:recipeId").get(getOneRecipe);
router
  .route("/:recipeId")
  .all(AuthMiddleware)
  .put(updateRecipe)
  .delete(deleteARecipe);

router
  .route("/:recipeId/note")
  .get(getAllNote)
  .all(AuthMiddleware)
  .post(makeNote); // when user make a note
router
  .route("/:recipeId/saved-recipe")
  .all(AuthMiddleware)
  .post(toggleBookMarkRecipe); // when user save a recipe

router.route("/").get(getAllRecipe).all(AuthMiddleware).post(createRecipe);
export default router;
