const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to database");
});

// Importing the routes
const pinRoute = require("./routes/pin");
const userRoute = require("./routes/user");
// Using middleware for parsing the body of the request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the routes as middlesware
app.use("/api/v1/pin", pinRoute);
app.use("/api/v1/user", userRoute);
// using url shortner routes
// using main routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    routes: {
      "/api/v1/pin": "Get all pins",
      "/api/v1/pin/": "Get a pin",
      "/api/v1/pin/": "Post a pin",
      "/api/v1/pin/:id/delete": "Delete a pin",

      "/api/v1/user/register": "Register a user",
      "/api/v1/user/login": "Login a user",
    },
  });
});

// Listening to the port
app.listen(PORT, () => console.log(`App live on http://localhost:${PORT}`));
