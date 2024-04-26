const User = require("../models/users");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  // Search for user in DB -> returns null if not found
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "E-mail already exist, use a different one",
    });
  }

  console.log("req.body:", req.body);
  try {
    const user = await User.create(req.body);
    console.log("req.body", req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
};
