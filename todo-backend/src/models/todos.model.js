const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must be provided todo title"],
    maxlength: [100, "name must be less than 20 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Must be provided todo description"],
  },
  steps: {
    type: String,
    enum: ['todo', 'inProgress', "done"],
    default: 'todo',
    required: [true, "Must be provided todo steps"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
