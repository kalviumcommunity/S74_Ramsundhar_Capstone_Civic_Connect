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

// Create a new issue
router.post("/create", async (req, res) => {
    const { title, category, description1, image, user } = req.body;

    if (!title || !category || !description1 || !image || !user) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newIssue = new Issue({
            title,
            category,
            description1,
            image,
            user
        });

        await newIssue.save();
        res.status(201).json({ message: "Issue created successfully", issue: newIssue });
    } catch (error) {
        console.error("Issue Creation Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
