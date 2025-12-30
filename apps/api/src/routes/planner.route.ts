import express from "express";
const router: express.Router = express.Router();

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { fetchPlannerData, makePlanner } from "../controller/planner.controller";

// handle planner related operations like create planner / fetch all planner data
router.route("/").all(AuthMiddleware).post(makePlanner).get(fetchPlannerData)




export default router;
