import express from "express";
import {
  createCommunity,
  fetchAllCommunities,
  uploadOnCommunity,
} from "../controller/community.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router: express.Router = express.Router();

router.route("/").get(fetchAllCommunities).all(AuthMiddleware).post(createCommunity);

router.route("/:communityId").post(uploadOnCommunity);
export default router;
