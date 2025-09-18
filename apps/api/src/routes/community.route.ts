import express from "express";
import {
  createCommunity,
  uploadOnCommunity,
} from "../controller/community.controller";

const router: express.Router = express.Router();

router.route("/").post(createCommunity);

router.route("/:communityId").post(uploadOnCommunity);
export default router;
