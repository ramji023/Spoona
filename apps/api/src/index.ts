import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // use express json middleware to parse to json data
app.use(express.urlencoded()); // use express urlencoded middleware to  encode the formData



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
import plannerRoute from "./routes/planner.route"
app.use("/api/v1/planner",plannerRoute)

//handle error globally
import { errorHandler } from "./middlewares/error.middleware";
app.use(errorHandler);

// start the server
app.listen(3000);
