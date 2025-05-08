const Discussion = require('../models/discussion');
const User = require('../models/user');
const express = require('express');
const router = express.Router();



// Test route
router.get("/", (req, res) => {
    res.send("Discussion route is working...");
});


// Get all discussions
router.get('/all', async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('user', '-password');
        res.status(200).json(discussions);
    } catch (error) {
        console.error("Fetch Discussions Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get a discussion by ID
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



module.exports = router;
