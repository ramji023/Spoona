import express from "express";
import {prisma} from "@repo/database";
const app = express();

app.get("/", async function (req, res) {
  const user =await prisma.user.findFirst()
  console.log(user)
  res.send("spoona server is running properly");
});


app.listen(3000);
