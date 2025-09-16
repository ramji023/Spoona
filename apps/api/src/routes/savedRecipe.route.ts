import express from "express";
import { toggleBookMarkRecipe } from "../controller/savedRecipe.controller";

const router: express.Router = express.Router();

router.route("/:recipeId").post(toggleBookMarkRecipe);

export default router;
