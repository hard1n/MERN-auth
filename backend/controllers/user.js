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

  try {
    // console.log("req.body", req.body);
    // req.body.password = bcrypt.hashSync(req.body.password, 8);
    // console.log("Clave:", req.body.password);
    const user = await User.create(req.body);
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
