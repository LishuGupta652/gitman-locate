const router = require("express").Router;
const Pin = require("../models/Pin");

// Create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
});

// Get a pin

module.exports = router;
