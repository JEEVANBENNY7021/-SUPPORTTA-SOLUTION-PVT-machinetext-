const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid format'
      });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  };
  
// Add this to your auth middleware file
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin privileges required'
      });
    }
    next();
  };
// 👇 Add this:
exports.isOwnerOrAdmin = async (req, res, next) => {
  const userIdFromToken = req.user.userId;
  const userRole = req.user.role;

  if (userRole === 'admin') return next();

  const Product = require('../models/Product');

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.userId !== userIdFromToken) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
