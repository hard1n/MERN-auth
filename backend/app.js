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
const userRoutes = require("./routes/auth");

/* CONNECT DATABASE */
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

/* MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // parse JSON bodies
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

/* ROUTES MIDDLEWARE */
app.use("/api", userRoutes);

/* ERROR MIDDLEWARE */
app.use(errorHandler);

/* APP LISTENING PORT */
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
