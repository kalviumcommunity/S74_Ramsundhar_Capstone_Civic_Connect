const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Issue = require('../models/issue')
const Discussion = require('../models/discussion')
const Improvement = require('../models/improvement')
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("User route is working...");
});

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

// Get user profile by email (protected)
router.get('/profile/:emailid', authMiddleware, async (req, res) => {
    try {
        const email = req.params.emailid;
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword, role, address } = req.body;

    if (!name || !email || !password || !confirmPassword || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(address) || address.length === 0) {
        return res.status(400).json({ message: "Address is required and must be an array." });
    }

    const { street, city, state, pincode, country } = address[0];

    if (!street || !city || !state || !pincode || !country) {
        return res.status(400).json({ message: "All address fields are required" });
    }

    if (isNaN(pincode) || !Number.isInteger(pincode)) {
        return res.status(400).json({ message: "Zip code must be a valid integer" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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


// Login route with JWT and cookie
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

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '3d' }
        );

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        // });

        res.cookie('token', token, {
        httpOnly: true,
        secure: false,  // from .env
        sameSite: process.env.COOKIE_SAMESITE || 'lax',
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
});


        res.status(200).json({
            message: "Login successful",
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // or "None" if using cross-origin
    secure: false,   // set to true in production
  });
  return res.status(200).json({ message: "Logged out successfully" });
});


// Update user (protected)
router.put("/update/:email", authMiddleware, async (req, res) => {
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

// Delete user (protected)
router.delete("/delete/:email", authMiddleware, async (req, res) => {
    try {
        const email = req.params.email;

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get issues created by user
router.get('/:email/issues', authMiddleware, async (req, res) => {
  try {
    const email = req.params.email;
    const issues = await Issue.find({ createdByEmail: email }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("Fetch Issues Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Get discussions created by user
// router.get('/:email/discussions', authMiddleware, async (req, res) => {
//   try {
//     const email = req.params.email;
//     const discussions = await Discussion.find({ createdByEmail: email }).sort({ createdAt: -1 });
//     res.json(discussions);
//   } catch (error) {
//     console.error("Fetch Discussions Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Get proposals created by user
// router.get('/:email/improvements', authMiddleware, async (req, res) => {
//   try {
//     const email = req.params.email;
//     const proposals = await Improvement.find({ createdByEmail: email }).sort({ createdAt: -1 });
//     res.json(proposals);
//   } catch (error) {
//     console.error("Fetch Proposals Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


module.exports = router;
