// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const allSnacks = require("./controllers/snackController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/snacks", allSnacks);

// ROUTES

app.get("/", (req, res) => {
  res.send("Welcome to Snack-A-Log Group 5");
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

// EXPORT
module.exports = app;
