const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ErrorResponse = require("../utils/error_response");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  console.log("Token: ", req.cookies.token);

  /* CHECKING IF THE TOKEN EXISTS */
  if (!token) {
    console.log("You need to log in to acces this resource! , 401");
    // return new ErrorResponse("You need to log in to acces this resource!", 401);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }

  try {
    /* VERIFYING THE TOKEN */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    console.error("Error verifying token: ");
    new ErrorResponse(
      "You need to log in to acces this resource!. Invalid or expired token.",
      401
    );
    // res
    //   .status(401)
    //   .json({ success: false, message: "Invalid or expired token." });
  }
};
