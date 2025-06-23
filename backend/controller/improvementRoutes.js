const express = require('express');
const router = express.Router();
const Improvement = require('../models/improvement');
const User = require('../models/user');
const auth = require('../middleware/auth');
const mongoose = require("mongoose");

// Health check
router.get('/', (req, res) => {
  res.status(200).json("Improvement API is working good");
});

// Get all improvements
router.get('/improvements', async (req, res) => {
  try {
    const improvements = await Improvement.find().populate('user', 'name email');
    res.status(200).json(improvements);
  } catch (err) {
    console.error("Fetch Improvements Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get improvement by ID
router.get('/improvements/:id', async (req, res) => {
  try {
    const improvement = await Improvement.findById(req.params.id).populate('user', 'name email');
    if (!improvement) return res.status(404).json({ error: 'Improvement not found' });

    res.status(200).json(improvement);
  } catch (err) {
    console.error("Get by ID Error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create improvement proposal
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description, impact, estimated_time, estimated_budget, phone } = req.body;
    const userId = req.user.userId; // From token (auth middleware)

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: "User does not exist." });
    }

    const newImprovement = new Improvement({
      title,
      description,
      impact,
      estimated_time,
      estimated_budget,
      phone,
      user: userId,
    });

    await newImprovement.save();
    res.status(201).json({ message: "New improvement proposal created." });
  } catch (error) {
    console.error("Create Proposal Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



router.patch("/:id/vote", auth, async (req, res) => {
  const userId = req.user.userId;

  try {
    const improvement = await Improvement.findById(req.params.id);
    if (!improvement) {
      return res.status(404).json({ error: "Improvement not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const alreadyVoted = improvement.votes.some(v =>
      v.equals(userObjectId)
    );

    if (alreadyVoted) {
      // ✅ Undo vote
      improvement.votes = improvement.votes.filter(
        v => !v.equals(userObjectId)
      );
    } else {
      // ✅ Add vote
      improvement.votes.push(userObjectId);
    }

    await improvement.save();
    res.status(200).json({
      message: alreadyVoted ? "Vote removed" : "Vote added",
      votes: improvement.votes.length,
    });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ error: "Failed to toggle vote" });
  }
});






module.exports = router;
