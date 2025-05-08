const express = require('express');
const Issue = require('../models/issue');
const router = express.Router();

// Test route for issues
router.get("/", (req, res) => {
    res.send("Issue routes are working...");
});


// Get all issues
router.get("/all", async (req, res) => {
    try {
        const issues = await Issue.find().populate('user', 'name email'); // populate user details
        res.status(200).json(issues);
    } catch (error) {
        console.error("Get Issues Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get an issue by ID
router.get("/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id).populate('user', 'name email');
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json(issue);
    } catch (error) {
        console.error("Get Issue by ID Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
