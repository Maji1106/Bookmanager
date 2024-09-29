const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 0 },
  episode: { type: Number, default: 1 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
