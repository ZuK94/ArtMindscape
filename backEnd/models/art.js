const Joi = require("joi");
const mongoose = require("mongoose");

// art object schema

const artSchema = new mongoose.Schema({
  imageName: {
    type: String,
    minLength: 2,
    maxLength: 60,
    required: true,
  },
  base64Image: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    maxLength: 1000,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Date,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sharedAt: {
    type: Date,
  },
  isPublic: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// declaring a mongoose art model

const Art = mongoose.model("Art", artSchema);

// art schema validation using Joi

const validateArt = (art) => {
  const schema = Joi.object({
    imageName: Joi.string().min(2).max(60).required(),
    base64Image: Joi.string().required(),
    prompt: Joi.string().max(1000).required(),
    model: Joi.string().required(),
  });
  return schema.validate(art, { abortEarly: false });
};

// art update schema validation using Joi

const validateArtUpdate = (art) => {
  const schema = Joi.object({
    imageName: Joi.string().min(2).max(60).required(),
    edited: Joi.date().required(),
  });
  return schema.validate(art, { abortEarly: false });
};

// art publishing schema validation

// module exporting
module.exports = { Art, validateArt, validateArtUpdate };
