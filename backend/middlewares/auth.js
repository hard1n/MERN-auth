const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ErrorResponse = require("../utils/error_response");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  console.log("Token = ", JSON.stringify(req.cookies));

  /* CHECKING IF THE TOKEN EXISTS */
  if (!token) {
    console.log("You need to log in to acces this resource! , 401");
    return new ErrorResponse("You need to log in to acces this resource!", 401);
  }

  try {
    /* VERIFYING THE TOKEN */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return new ErrorResponse("You need to log in to acces this resource!", 401);
  }
};
