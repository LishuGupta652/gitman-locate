const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Connected to database");
});

// Importing the routes
// Using middleware for parsing the body of the request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the routes as middlesware
// using url shortner routes
// using main routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    routes: {
      allpost: "/api/posts",
      postingroute: "/api/posts",
      specific: "api/posts/:id",
      delete: "/api/posts/:id",
      patch: "/api/posts/:id",
    },
  });
});

// Listening to the port
app.listen(PORT, () => console.log(`App live on http://localhost:${PORT}`));
