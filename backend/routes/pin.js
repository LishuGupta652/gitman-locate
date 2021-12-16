const router = require("express").Router();
const Pin = require("../models/Pin");

// Create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);

  try {
    const savedPin = await newPin.save();
    return res
      .status(200)
      .json({ message: "Pin created successfully", pin: savedPin });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

// Get a pin

module.exports = router;
