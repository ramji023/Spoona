import express from "express";
import {
  AddMembersOnCommunity,
  createCommunity,
  deleteMemberOnCommunity,
  fetchAllCommunities,
  fetchSingleCommunity,
  uploadOnCommunity,
} from "../controller/community.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router: express.Router = express.Router();

router
  .route("/")
  .get(fetchAllCommunities)
  .all(AuthMiddleware)
  .post(createCommunity);
router
  .route("/:communityId/members")
  .all(AuthMiddleware)
  .post(AddMembersOnCommunity)
  .delete(deleteMemberOnCommunity);
router
  .route("/:communityId")
  .get(fetchSingleCommunity)
  .all(AuthMiddleware)
  .post(uploadOnCommunity);
export default router;
