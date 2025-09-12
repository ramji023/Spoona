import express from "express";
const router: express.Router = express.Router();
import {
  signin,
  signup,
  updateProfile,
  changeAvatar,
  getProfileData,
  deleteAccount
} from "../controller/user.controller";

router
  .route("/")
  .post(signin)
  .post(signup)
  .post(updateProfile)
  .post(changeAvatar)
  .get(getProfileData);

  router.route("/:id").post(deleteAccount)
export default router;
