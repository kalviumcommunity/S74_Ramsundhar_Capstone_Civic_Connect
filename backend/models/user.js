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
address: {
  type: [{
    street: { type: String, trim: true, required: [true, "Street is required"] },
    city: { type: String, trim: true, required: [true, "City is required"] },
    state: { type: String, trim: true, required: [true, "State is required"] },
    pincode: {
      type: Number,
      required: [true, "Pin code is required"],
      validate: {
        validator: Number.isInteger,
        message: 'Pin code must be a number'
      }
    },
    country: { type: String, trim: true, required: [true, "Country is required"] }
  }],
  required: [true, "Address is required"]
}

}, 
{ timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
