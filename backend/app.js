require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const morgan = require("morgan");
/* IMPORT ROUTES */
const userRoutes = require("./routes/user");

/* CONNECT DATABASE */
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

/* MIDDLEWARES */
// parse JSON bodies
app.use(morgan("dev"));
app.use(express.json());

/* ROUTES MIDDLEWARE */
app.use("/api", userRoutes);

/* APP LISTENING PORT */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
