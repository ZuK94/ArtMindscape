const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

// Route to user log in
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  // finding requested user

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  // user password validation
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("wrong password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }

  // user token generation

  const token = user.createAuthToken();
  return res.send({ token });
});
// user log in END

// User data validation with Joi schema
const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(6)
      .max(255)
      .required(),
    password: Joi.string().min(8).max(2048).required(),
  });
  return schema.validate(user);
};

module.exports = router;
