const express = require("express");
const router = express.Router();
const authMW = require("../middleware/auth");
const editorMW = require("../middleware/editor");
const { validateArt, Art, validateArtUpdate } = require("../models/art");

//Route to upload new art to DB

router.post("/upload-new-image", authMW, editorMW, async (req, res) => {
  try {
    const params = req.body;
    const { error } = validateArt(params);
    if (error) {
      res.status(400).send("invalid input data");
      return;
    }
    let art = await Art.findOne({ base64Image: req.body.base64Image });

    if (art) {
      return res.status(401).send("You have already saved this");
    } else {
      art = await new Art({ ...req.body, user_id: req.user._id }).save();
      return res.send("Art has been created");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//Route to get logged user art

router.get("/user-collections", authMW, async (req, res) => {
  try {
    const collection = await Art.find({ user_id: req.user._id });
    return res.send(collection);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//Route to get creator art

router.get("/creator-collection/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const collection = await Art.find({ user_id: id, isPublic: true });
    res.send(collection);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

//Route to get all public art

router.get("/all-shared", async (req, res) => {
  try {
    const response = await Art.find({ isPublic: true });
    res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

//Route to update art

router.put("/:id", authMW, async (req, res) => {
  try {
    const imageName = req.body.imageName;
    const id = req.params.id;

    const updatedArtInfo = { imageName, edited: new Date() };

    const { error } = validateArtUpdate(updatedArtInfo);
    if (error) {
      return res.status(400).send("Invalid input data");
    }

    const art = await Art.findOneAndUpdate(
      {
        _id: id,
        user_id: req.user._id,
      },
      updatedArtInfo,
      { new: true }
    );
    return res.send(art);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

//Route to manage likes

router.put("/like/:id", authMW, async (req, res) => {
  try {
    const art_id = req.params.id;
    const user_id = req.user._id;
    const isLiked = req.body.isLiked;
    if (!isLiked) {
      return res.send(
        await Art.findByIdAndUpdate(
          art_id,
          { $addToSet: { likes: user_id } },
          { new: true }
        )
      );
    } else {
      return res.send(
        await Art.findByIdAndUpdate(
          art_id,
          { $pull: { likes: user_id } },
          { new: true }
        )
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

//Route to delete art

router.delete("/:id", authMW, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedArt = await Art.findOneAndDelete({
      _id: id,
      user_id: req.user._id,
    });
    return res.send(deletedArt);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

//Route to make art public

router.post("/share/:id", authMW, async (req, res) => {
  try {
    const id = req.params.id;
    const isPublic = req.body.isPublic;
    const sharedAt = new Date();
    const shareStatus = { isPublic, sharedAt };
    const response = await Art.findOneAndUpdate(
      {
        _id: id,
        user_id: req.user._id,
      },
      shareStatus,
      { new: true }
    );
    return res.send(response);
  } catch (error) {
    console.error(error);

    return res.status(500).send("server error");
  }
});

//Route to get random art objects
router.get("/random/:amount", async (req, res) => {
  const amount = parseInt(req.params.amount);
  try {
    const response = await Art.aggregate([
      { $match: { isPublic: true } },
      { $sample: { size: amount } },
    ]);
    return res.send(response);
  } catch (error) {
    return res.status(500).send("server error");
  }
});

module.exports = router;
