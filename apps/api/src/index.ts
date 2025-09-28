import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
// app.get("/", async function (req, res) {
//   res.send("spoona server is running properly");
// });
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());
// handle user operations
import userRoute from "./routes/user.route";
app.use("/api/v1/user", userRoute);

//handle recipe operation
import recipeRoute from "./routes/recipe.route";
app.use("/api/v1/recipe", recipeRoute);

//handle community operation
import communityRoute from "./routes/community.route";
app.use("/api/v1/community", communityRoute);

//export error middleware
import { errorHandler } from "./middlewares/error.middleware";
app.use(errorHandler);
app.listen(3000);
