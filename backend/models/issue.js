const mongoose = require('mongoose');

const Issue_Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Roads & Infrastructure',
            'Water Supply',
            'Electricity',
            'Waste Management',
            'Public Safety',
            'Pollution',
            'Other Issues'
        ],
        required: true
    },
    description1: {
        type: String,
        required: true,
        minLength: 10
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Issue", Issue_Schema);
