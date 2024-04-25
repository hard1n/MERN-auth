require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
// IMPORT ROUTES
const userRoutes = require("./routes/user");

// CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARES
app.use("/api", userRoutes);

// APP LISTENING PORT
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
