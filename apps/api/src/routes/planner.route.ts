import express from "express";
const router: express.Router = express.Router();

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { makePlanner } from "../controller/planner.controller";

router.route("/").all(AuthMiddleware).post(makePlanner)




export default router;
