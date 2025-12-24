import express from "express";
const router: express.Router = express.Router();
import {
  signin,
  signup,
  updateProfile,
  getProfileData,
  refreshedToken,
  signout,
  getPopularCreators,
} from "../controller/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware"; // import authentication middleware to protect the routes

router.post("/auth/signup", signup); // handle user signup operation
router.post("/auth/signin", signin); //handle user signin operation
router.post("/auth/signout", AuthMiddleware, signout); // handle user signout operation
router.route("/").all(AuthMiddleware).get(getProfileData).post(updateProfile); // handle user profile-data based operations like update profile, get profile 
// router.route("/avatar").all(AuthMiddleware).post(changeAvatar); // handle user changeAvatar (profile picture ) operation
router.route("/refresh").post(refreshedToken); // handle user refresh token operation 
router.route("/creators").get(getPopularCreators)
export default router;
