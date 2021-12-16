const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// register User
router.post("/register", async (req, res) => {
  try {
    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create a new User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // Save user and send response
    const user = await newUser.save();
    return res
      .status(200)
      .json({ message: "User created successfully", id: user._id });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});
// Login User

module.exports = router;
