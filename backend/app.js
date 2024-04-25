require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

// CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // console.log("Hello from server!");
  res.send("Hello from server!");
  // next();
});

// app listening port
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
