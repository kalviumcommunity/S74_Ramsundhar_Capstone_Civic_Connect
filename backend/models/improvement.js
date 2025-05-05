const mongoose = require('mongoose')


const Improvement_Schema = new mongoose.Schema({
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
    impact:{
        type:String,
        require:true,
        minlenght:15

    },
    estimated_time:{
        type:Number,
        require:true
    },
    estimated_budget:{
        type:Number,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },user:{
        type:mongoose.Schema.ObjectId,
        ref:User
    }

},
{timestamps:true
}

)

module.exports = new mongoose.model("Improvement", Improvement_Schema)