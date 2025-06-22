const mongoose = require('mongoose');

const ImprovementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,           // ✅ fixed typo: require → required
      minlength: 5              // ✅ fixed typo: minlenght → minlength
    },
    description: {
      type: String,
      required: true,
      minlength: 30
    },
    impact: {
      type: String,
      required: true,
      minlength: 15
    },
    estimated_time: {
      type: Number,
      required: true
    },
    estimated_budget: {
      type: Number,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Improvement", ImprovementSchema);
