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

// Create a new issue (user is taken from schema default)
router.post("/create", async (req, res) => {
    const { title, category, description1, image } = req.body;

    if (!title || !category || !description1 || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newIssue = new Issue({
            title,
            category,
            description1,
            image
            // user is omitted so schema default applies
        });

        await newIssue.save();
        res.status(201).json({ message: "Issue created successfully", issue: newIssue });
    } catch (error) {
        console.error("Issue Creation Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update an issue by ID
router.put("/update/:id", async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        const { title, category, description1, image, user } = req.body;

        if (title) issue.title = title;
        if (category) issue.category = category;
        if (description1) issue.description1 = description1;
        if (image) issue.image = image;
        if (user) issue.user = user; // Optional manual override

        await issue.save();
        res.status(200).json({ message: "Issue updated successfully", issue });
    } catch (error) {
        console.error("Update Issue Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an issue by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
        if (!deletedIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error) {
        console.error("Delete Issue Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
