const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: String,
  products: [String] 
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
