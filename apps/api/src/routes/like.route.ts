import express from "express";

const router: express.Router = express.Router();
import { toggleLikeRecipe } from "../controller/like.controller";

router.route("/:recipeId").post(toggleLikeRecipe);

export default router;
