const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user", // user, admin
    },
    status: {
      type: String,
      required: true,
      default: "pending", // active, inactive or pending
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
