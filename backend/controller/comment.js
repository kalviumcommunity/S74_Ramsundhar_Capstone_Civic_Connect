const express = require("express");
const Comment = require("../models/comment");
const Discussion = require("../models/discussion");
const auth = require("../middleware/auth"); // ensure user is logged in

const router = express.Router();


router.post("/:discussionId", auth, async (req, res) => {
  try {
    const { content } = req.body;
    const { discussionId } = req.params;

    const newComment = new Comment({
      content,
      discussion: discussionId,
      user: req.user.userId, // ✅ Use req.user.userId if that's how your JWT is built
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Post Comment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// GET /comment/:discussionId
router.get("/:discussionId", async (req, res) => {
  try {
    const comments = await Comment.find({ discussion: req.params.discussionId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.error("Fetch Comments Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
