const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10, maxlength: 50 },
  price: { type: Number, required: true },
  category: { type: String, lowercase: true },
  image: String,
  ownerId: String,
  productId: { type: String, unique: true }
});

module.exports = mongoose.model('Product', productSchema);
