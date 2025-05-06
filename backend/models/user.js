const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
    address: [{
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type:Number },
        country: { type: String }
    }]
    
},

{timestamps:true});



const User = mongoose.model("User", userSchema );

const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validate  = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")).label("Confirm Password").messages({ "any.only": `"Confirm Password" must match "Password"`})
    });
    return schema.validate(data)
};

module.exports = User;