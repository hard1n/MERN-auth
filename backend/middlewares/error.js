const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: err.message || "Server Error!",
  });
};

module.exports = errorHandler;
