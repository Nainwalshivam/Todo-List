// models/Todo.js
const mongoose = require('mongoose');

// Define the Todo schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create the Todo model
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
