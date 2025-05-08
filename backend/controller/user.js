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

// Register route
router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword, role, address } = req.body;

    // Basic manual validation
    if (!name || !email || !password || !confirmPassword || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            address
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.role !== role) {
            return res.status(401).json({ message: "Invalid credentials or role" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Update user details by email
router.put("/update/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const updates = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        Object.assign(user, updates);
        await user.save();

        res.json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
