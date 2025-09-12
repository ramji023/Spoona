import express from "express";
import {
  getAllRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getSingleRecipe,
} from "../controller/recipe.controller";
const router: express.Router = express.Router();

router.route("/").get(getAllRecipe).post(createRecipe);
router
  .route("/:id")
  .post(updateRecipe)
  .delete(deleteRecipe)
  .post(getSingleRecipe);
export default router;
