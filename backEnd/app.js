require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const apiRouter = require("./routers/api");
const artRouter = require("./routers/art");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/zuks_app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection to MongoDB failed - ", err);
  });

// Create Express app
const app = express();
app.use(morgan("dev"));

// Set up body-parser and JSON parsing
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// Enable CORS
app.use(cors());

// Set up routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use("/art", artRouter);

// Handle all other routes with a 404 error
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
