const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logout,
  singleUser,
  userProfile,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/getuser", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);
router.get("/test", (req, res) => {
  console.log(req.cookies);
  res.send("OK");
});

module.exports = router;
