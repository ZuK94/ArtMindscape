const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { secretToken } = require("../configs/config");

// user object schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 40,
    required: true,
  },
  email: {
    type: String,
    minLength: 6,
    maxLength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 1024,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "viewer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// token creation method for user

userSchema.methods.createAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, secretToken);
  return token;
};

// declaring a mongoose user model

const User = mongoose.model("User", userSchema);

// user schema validation using Joi

const validateNewUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(6)
      .max(255)
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      .required(),
    password: Joi.string()
      .min(8)
      .max(2048)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\-_*&^$#@!])[A-Za-z\d*\-_*&^$#@!]{8,56}$/
      )
      .required(),
    role: Joi.string().required(),
  });
  return schema.validate(user, { abortEarly: false });
};

// module exporting
module.exports = { User, validateNewUser };
