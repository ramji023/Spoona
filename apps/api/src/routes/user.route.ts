import express from "express";
const router: express.Router = express.Router();
import {
  signin,
  signup,
  updateProfile,
  changeAvatar,
  getProfileData,
  deleteAccount,
  refreshedToken,
  signout,
} from "../controller/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/signout", AuthMiddleware, signout);
router.route("/").all(AuthMiddleware).get(getProfileData).post(updateProfile);
router.route("/avatar").all(AuthMiddleware).post(changeAvatar);
router.route("/refresh").post(refreshedToken);
export default router;
