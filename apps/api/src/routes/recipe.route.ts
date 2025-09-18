import express from "express";
import {
  getAllRecipe,
  createRecipe,
  deleteARecipe,
  updateRecipe,
  getOneRecipe,
} from "../controller/recipe.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
const router: express.Router = express.Router();

router.route("/").get(getAllRecipe).all(AuthMiddleware).post(createRecipe);
router.route("/:recipeId").get(getOneRecipe);
router
  .route("/:recipeId")
  .all(AuthMiddleware)
  .put(updateRecipe)
  .delete(deleteARecipe);

export default router;
