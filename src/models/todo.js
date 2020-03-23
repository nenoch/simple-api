const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    completed: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Todo', TodoSchema);
