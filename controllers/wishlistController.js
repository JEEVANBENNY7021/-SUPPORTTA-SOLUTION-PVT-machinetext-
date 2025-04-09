const Wishlist = require('../models/wishlist.js');


// ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ userId: req.user.userId });

  if (!wishlist) wishlist = new Wishlist({ userId: req.user.userId, products: [] });

  if (wishlist.products.length >= 15)
    return res.status(400).json({ message: 'Wishlist full (15 max)' });

  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
  }

  res.json({ message: 'Added to wishlist' });
};


// REMOVE FROM WISHLIST

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.body;
  const wishlist = await Wishlist.findOne({ userId: req.user.userId });

  if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

  wishlist.products = wishlist.products.filter(p => p !== productId);
  await wishlist.save();
  res.json({ message: 'Removed from wishlist' });
};


// GET WISHLIST
exports.getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.userId });
  res.json(wishlist?.products || []);
};
