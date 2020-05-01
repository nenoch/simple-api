const mongoose = require('mongoose');

const daySchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Day', daySchema);