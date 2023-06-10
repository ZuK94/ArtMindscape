const express = require("express");
const router = express.Router();
const authMW = require("../middleware/auth");
const editorMW = require("../middleware/editor");
const { getTextToImage } = require("../services/apiServices");

router.post("/text2image", authMW, editorMW, async (req, res) => {
  if (!req.body) {
    res.status(500).send("An error occurred while processing the request.");
  }
  const params = req.body;
  const response = await getTextToImage(params);
  if (response.headers && response.headers["content-type"]) {
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } else {
    res.status(500).send("An error occurred while processing the request.");
  }
});

module.exports = router;
