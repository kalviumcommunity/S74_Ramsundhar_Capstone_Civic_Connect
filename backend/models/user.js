const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
            },
            message: props => `Password must include uppercase, lowercase, number, and special character`
        }
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["citizen", "Admin"]
    },
    address: [{
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { 
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: 'Zip code must be a number'
            }
        },
        country: { type: String, trim: true }
    }]
}, 
{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
