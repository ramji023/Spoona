import express from "express";
import {
  AddMembersOnCommunity,
  createCommunity,
  deleteMemberOnCommunity,
  fetchAllCommunities, // controller to fetch all the communities data
  fetchSingleCommunity,
  uploadOnCommunity,
} from "../controller/community.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router: express.Router = express.Router();

router
  .route("/")
  .get(fetchAllCommunities) //  fetch all the communities data
  .all(AuthMiddleware) // apply authentication middleware
  .post(createCommunity); // create new community
router
  .route("/:communityId/members")
  .all(AuthMiddleware)
  .post(AddMembersOnCommunity)
  .delete(deleteMemberOnCommunity);
router
  .route("/:communityId")
  .get(fetchSingleCommunity) // fetch single community data
  .all(AuthMiddleware)
  .post(uploadOnCommunity); // upload recipe on the community
export default router;
