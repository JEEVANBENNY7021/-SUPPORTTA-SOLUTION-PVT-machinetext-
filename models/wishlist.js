const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: String,
  products: [String] // Product IDs (max 15)
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
