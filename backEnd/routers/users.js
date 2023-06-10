const express = require("express");
const { User, validateNewUser } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const authMW = require("../middleware/auth");
const webAdminMW = require("../middleware/webAdmin");
const mongoose = require("mongoose");

// Route to create a new user
router.post("/new-user", async (req, res) => {
  try {
    // Validate user info with Joi
    const { error } = validateNewUser(req.body);
    if (error) {
      return res.status(400).send(error);
    }

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send("user already registered");
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create and save the new user
    user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();

    // Send back some user info
    res.send(_.pick(user, ["_id", "name", "email", "admin"]));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Route to get user info of all users who created content for main album
router.post("/user-info", async (req, res) => {
  try {
    const user_ids = req.body.users.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const users = await User.find({ _id: { $in: user_ids } }, { password: 0 });
    res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Route to get all users info
router.get("/all", authMW, webAdminMW, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Route to update user role
router.put("/role-update", authMW, webAdminMW, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      { role: req.body.role },
      { new: true, fields: { name: 1, role: 1 } }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// Route to update user info
router.post("/user-update", authMW, async (req, res) => {
  try {
    const bodyValues = Object.entries(req.body)[0];
    const key = bodyValues[0];
    const value = bodyValues[1];

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { [key]: value },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
