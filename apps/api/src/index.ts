import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cron from "node-cron";
//  create instance of app
const app = express();

app.use(helmet()); // Help secure Express apps by setting HTTP response headers

// define cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  })
);

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// apply rate limiting middleware to all requests
app.use(limiter);

// use cooki-parser middleware
app.use(cookieParser());
app.use(express.json({ limit: "10kb" })); // use express json middleware to parse to json data
app.use(express.urlencoded()); // use express urlencoded middleware to  encode the formData

// run function to fetch all the images url
import { cleanupUnusedImages } from "./utils/cleanup";

// make sure prisma is connected
import { prisma } from "@repo/database";
async function testPrismaConnection() {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    console.log("prisma connected successfully");
  } catch (error) {
    console.error("prisma connection failed:", error);
  }
}
testPrismaConnection();

// route handle user based operations like signup, signin, profile data, update profile data, refresh token etc
import userRoute from "./routes/user.route";
app.use("/api/v1/user", userRoute);

//handle recipe operations like add recipe, fetch recipe, update recipe, delete recipe data
import recipeRoute from "./routes/recipe.route";
app.use("/api/v1/recipe", recipeRoute);

//handle community based operation such as fetch all communities and community recipes and members etc
import communityRoute from "./routes/community.route";
app.use("/api/v1/community", communityRoute);

//handle planner operation
import plannerRoute from "./routes/planner.route";
app.use("/api/v1/planner", plannerRoute);

//  hadnle subscriber operation
import subscriberRoute from "./routes/subscriber.route";
app.use("/api/v1/subscriber", subscriberRoute);

//handle error globally
import { errorHandler } from "./middlewares/error.middleware";
app.use(errorHandler);

// start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");

  // schedule cleanup to run daily at 3 AM
  cron.schedule("0 3 * * *", async () => {
    console.log("Running scheduled Cloudinary cleanup...");
    await cleanupUnusedImages();
  });
});
