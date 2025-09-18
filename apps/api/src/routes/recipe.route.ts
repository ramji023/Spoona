import express from "express";
import {
  getAllRecipe,
  createRecipe,
  deleteARecipe,
  updateRecipe,
  getOneRecipe,
} from "../controller/recipe.controller";
const router: express.Router = express.Router();

router.route("/").get(getAllRecipe).post(createRecipe);
router.route("/:recipeId").post(updateRecipe).delete(deleteARecipe);
router.route("/:recipeId").post(getOneRecipe);
export default router;
