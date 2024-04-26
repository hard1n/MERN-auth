const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a name"],
      maxlenth: 32,
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Please add an E-Mail"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid E-mail",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlenth: [6, "Password must be at least six(6) characters"],
      match: [
        // /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[\\w\\s]+$/,
        // /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "Password must contain at least: 1 uppercase letter, 1 lowercase letter and 1 number",
      ],

      role: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
