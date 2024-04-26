const User = require("../models/users");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  /* SEARCH USER IN DB -> returns null if not found */
  const userExists = await User.findOne({ email });

  /* VALIDATING IF EMAIL EXISTS */
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "E-mail already exist, use a different one",
    });
  }

  try {
    /* CREATING USER */
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

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "E-Mail and password are required",
      });
    }

    /* SEARCH USER IN DB BY EMAIL */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* VALIDATING PASSWORD */
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* OK STATUS */
    res.status(200).json({
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
