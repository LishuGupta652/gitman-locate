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
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send({ err: "User not found" });

    // Validate the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(401).send({ err: "Invalid password" });

    // Send response
    res
      .status(200)
      .send({ message: "User logged in successfully", id: user._id });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
