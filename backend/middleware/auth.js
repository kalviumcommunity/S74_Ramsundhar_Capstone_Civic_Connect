const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("🧪 COOKIES:", req.cookies); // ✅ Add this line

    const token = req.cookies.token;

    if (!token) {
        console.log("🚫 No token found in cookies");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("❌ Token verification failed");
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;
