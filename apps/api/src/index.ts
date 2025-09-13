import express from "express";
import cors from "cors";
const app = express();
// app.get("/", async function (req, res) {
 
//   res.send("spoona server is running properly");
// });
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


// handle user operations
import userRoute from "./routes/user.route"
app.use("/api/v1/user",userRoute)

//handle recipe operation
import recipeRoute from "./routes/recipe.route"
app.use("/api/v1/recipe",recipeRoute)

app.listen(3000);
