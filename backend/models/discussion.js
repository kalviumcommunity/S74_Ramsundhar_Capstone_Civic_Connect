const mongoose = require('mongoose')
const User = require('./user')

const Discussion_Schema  = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        minlenght:5
    },

    description:{
        type:String,
        require:true,
        minlenght:30
    },
    tags:{
        type:String,

    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref:User
    }},
    
    {timestamps:true})

module.exports= new mongoose.model('Discussion',Discussion_Schema)