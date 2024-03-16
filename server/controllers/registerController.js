const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");

// Registration for new user
const createNewUser = async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    return res.send({
      success: true,
      message: "Thanks for signing up! Please log in to get started",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
    createNewUser,
}