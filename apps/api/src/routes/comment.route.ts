import express from "express";
const router: express.Router = express.Router();

import { makeComment } from "../controller/comment.controller";

router.route("/:recipeId").post(makeComment);
export default router;
