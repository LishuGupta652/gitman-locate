const router = require("express").Router();
const Pin = require("../models/Pin");

// Create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);

  if (req.body) {
    try {
      const savedPin = await newPin.save();
      return res
        .status(200)
        .json({ message: "Pin created successfully", pin: savedPin });
    } catch (err) {
      return res.status(500).send({ err: err.message });
    }
  }
});

// Get a pin
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    return res.status(200).json({ pins });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
