const Product = require('../models/Product');

exports.isOwnerOrAdmin = async (req, res, next) => {
  const product = await Product.findOne({ productId: req.params.id });
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (req.user.role !== 'admin' && product.addedBy !== req.user.userId) {
    return res.status(403).json({ message: 'Not authorized to modify this product' });
  }

  next();
};