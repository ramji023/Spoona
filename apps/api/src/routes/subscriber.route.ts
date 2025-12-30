import express from "express";

const router:express.Router = express.Router()

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { toggleFollowOperation } from "../controller/subscriber.controller";


// handle user subscriber based opearations like follow or unfollow to  other cretors
router.route("/follow").all(AuthMiddleware).post(toggleFollowOperation)



export default router;