const mongoose= require('mongoose')

const Issue_Schema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    category:{
        type:String,
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
    description1:{
        type:String,
        require:true,
        minLenght:10
    },
    image:{
        type:String,
        require:true
    },

    user:{
            type:mongoose.Schema.ObjectId,
            ref:User
        }
},

{timestamps:true})

module.exports= new mongoose.model("Issue",Issue_Schema)