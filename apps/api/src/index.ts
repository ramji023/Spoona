import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("spoona server is running properly");
});


app.listen(3000);
