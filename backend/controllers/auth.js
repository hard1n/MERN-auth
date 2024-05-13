const User = require("../models/users");
const ErrorResponse = require("../utils/error_response");

/* GENERATE TOKEN */
const generateToken = async (user, res) => {
  try {
    const token = await user.jwtGenerate();
    // const expireCookie = parseInt(process.env.EXPIRE_TOKEN);
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3600),
      // sameSite: "lax",
      // secure: true,
    };

    res.cookie("token", token, options);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(erorr);
    return ErrorResponse("An error ocured in the server!", 500);
  }
};

/* SIGN UP */
exports.signup = async (req, res, next) => {
  const { email } = req.body;
  /* SEARCH USER IN DB -> returns null if not found */
  const userExists = await User.findOne({ email });

  /* VALIDATING IF EMAIL EXISTS */
  if (userExists) {
    return next(
      new ErrorResponse("E-mail already exist, use a different one", 400)
    );
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
    return next(error);
  }

  next();
};

/* SIGN IN */
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse("E-Mail and password are required", 400));
    }

    /* SEARCH USER IN DB BY EMAIL */
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    /* VALIDATING PASSWORD */
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    /* OK STATUS */
    generateToken(user, res);
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  // next();
};

/* LOG OUT */
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out sucessfully",
  });
  next();
};

/* USER PROFILE */
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

/* ---TESTING---- */
exports.singleUser = async (req, res, next) => {
  try {
    /* GETTING USER BY ID */
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
