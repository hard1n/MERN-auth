require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error");
const cors = require("cors");
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
app.use(cookieParser());
app.use(cors());

/* ROUTES MIDDLEWARE */
app.use("/api", userRoutes);

/* ERROR MIDDLEWARE */
app.use(errorHandler);

/* APP LISTENING PORT */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
