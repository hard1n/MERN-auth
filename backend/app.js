require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARES
app.get("/", (req, res) => {
  // console.log("Hello from server!");
  res.send("Hello from server!");
  // next();
});

// app listening port
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
