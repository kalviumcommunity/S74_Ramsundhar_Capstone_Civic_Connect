require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());
// === CORS ===
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// === Middleware ===
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// === Serve Uploaded Files ===
app.use('/uploads', express.static('uploads')); // Important for image access

// === Routes ===
const issueRoute = require('./controller/issueRoute');
const discussionRoute = require('./controller/discussionRoute');
const improvementRoute = require('./controller/improvementRoutes');
const userRoute = require('./controller/user');

app.use('/user', userRoute);
app.use('/issue', issueRoute);
app.use('/discussion', discussionRoute);
app.use('/improvement', improvementRoute);

// === Root Route ===
app.get('/', (req, res) => {
    res.json("You are currently in main page");
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((error) => {
    console.error("❌ MongoDB connection error:", error);
});

// === Start Server ===
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
