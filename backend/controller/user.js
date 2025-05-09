const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("User route is working...");
});

// Get user profile by email
router.get('/profile/:emailid', async (req, res) => {
    try {
        const email = req.params.emailid;

        const user = await User.findOne({ email }).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
