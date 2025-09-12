import express from "express";
const router: express.Router = express.Router();

import { getAllComment, makeComment } from "../controller/comment.controller";

router.route("/:recipeId").get(getAllComment).post(makeComment);
export default router;
