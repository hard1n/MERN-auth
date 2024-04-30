const ErrorResponse = require("../utils/error_response");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  /* MONGOOSE ERRORS */
  /** BAD ObjectID **/
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  /** DUPLICATED USER **/
  if (err.code === 11000) {
    const message = "Duplicated field value entered";
    error = new ErrorResponse(message, 404);
  }

  /** VALIDATIOR ERROR **/
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 404);
  }

  /* NODE.JS ERRORS */
  return res.status(error.status || 500).json({
    success: false,
    error: error.message || "Server Error!",
  });
};

module.exports = errorHandler;
