require('dotenv').config({ path: './config/.env' });

const mongoose = require('mongoose');
const express = require('express');

const cookieParser = require('cookie-parser');


const app = express();

const issueRoute = require('./controller/issueRoute')
const discussionRoute = require('./controller/discussionRoute')
const improvementRoute = require('./controller/improvementRoutes')
const userRoute  = require('./controller/user')
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});



// Routess


app.get('/', (req,res)=>{
    res.json("You are currently in main page")
})

app.use('/user',userRoute)
app.use('/issue',issueRoute)
// app.use('/discussion',discussionRoute)
// app.use('/improvement',improvementRoute)


// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
