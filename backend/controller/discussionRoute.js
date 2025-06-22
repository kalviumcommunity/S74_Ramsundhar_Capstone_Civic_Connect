const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
const authMiddleware = require("../middleware/auth")

// ✅ Test route
router.get("/", (req, res) => {
    res.send("Discussion route is working...");
});

// ✅ Get all discussions with user populated (no password)
router.get('/all', async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('user', '-password');
        res.status(200).json(discussions);
    } catch (error) {
        console.error("Fetch Discussions Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Get a discussion by ID
router.get('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate('user', '-password');
        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }
        res.status(200).json(discussion);
    } catch (error) {
        console.error("Get Discussion Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Create a new discussion (protected route)

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const newDiscussion = new Discussion({
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      user: req.user.userId,
    });

    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    console.error("Create Discussion Error:", error);
    res.status(400).json({ message: "Failed to create discussion", error: error.message });
  }
});


// ✅ Update discussion
router.put('/update/:id', async (req, res) => {
    try {
        const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedDiscussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        res.status(200).json(updatedDiscussion);
    } catch (error) {
        console.error("Update Discussion Error:", error);
        res.status(400).json({ message: "Failed to update discussion", error: error.message });
    }
});

// ✅ Delete discussion
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleted = await Discussion.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Discussion not found" });
        }
        res.status(200).json({ message: "Discussion deleted successfully" });
    } catch (error) {
        console.error("Delete Discussion Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
