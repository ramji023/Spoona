import express from "express";
import {
  getAllRecipe,
  createRecipe,
  deleteARecipe,
  updateRecipe,
  getOneRecipe,
} from "../controller/recipe.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware"; // import authentication middleware to protect the routes
import { getAllNote, makeNote } from "../controller/note.controller"; 
import {
  getAllSavedRecipe,
  toggleBookMarkRecipe,
} from "../controller/savedRecipe.controller";
const router: express.Router = express.Router();


router.route("/savedRecipe").all(AuthMiddleware).get(getAllSavedRecipe); // get all saved recipe data
router.route("/:recipeId").get(getOneRecipe); // get single recipe data
router
  .route("/:recipeId")
  .all(AuthMiddleware)
  .put(updateRecipe)
  .delete(deleteARecipe);

router
  .route("/:recipeId/note")
  .get(getAllNote) // get all the note for a specific recipe
  .all(AuthMiddleware)
  .post(makeNote); // when user make a note
router
  .route("/:recipeId/saved-recipe")
  .all(AuthMiddleware)
  .post(toggleBookMarkRecipe); // when user save a recipe

/***
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// handle recipe based operations such as getting all the recipes and creating recipe
router.route("/").get(getAllRecipe).all(AuthMiddleware).post(createRecipe);

export default router;
