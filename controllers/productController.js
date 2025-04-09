const Product = require('../models/Product');
const generateProductId = require('../utils/productIdGenerator');

exports.createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? `/public/${req.file.filename}` : null;

  const product = new Product({
    name,
    description,
    price,
    category,
    image,
    ownerId: req.user.userId,
    productId: generateProductId()
  });

  await product.save();
  res.status(201).json({ message: 'Product created' });
};

exports.getAllProducts = async (req, res) => {
  let { page = 1, search = '', sort = '', minPrice, maxPrice, category } = req.query;

  const query = {
    name: { $regex: search, $options: 'i' }
  };

  if (category) query.category = category;
  if (minPrice || maxPrice) query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

  const sortBy = sort === 'price' ? { price: 1 }
              : sort === 'name' ? { name: 1 }
              : { createdAt: -1 };

  const products = await Product.find(query)
    .select('name price image')
    .sort(sortBy)
    .skip((page - 1) * 5)
    .limit(5);

  res.json(products);
};

exports.getProductDetails = async (req, res) => {
  const product = await Product.findOne({ productId: req.params.id });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findOne({ productId: req.params.id });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (product.ownerId !== req.user.userId && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });

  Object.assign(product, req.body);
  if (req.file) product.image = `/public/${req.file.filename}`;
  await product.save();
  res.json({ message: 'Product updated' });
};

exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({ productId: req.params.id });
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      if (product.ownerId !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      await product.deleteOne();  // This is the corrected line
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ 
        message: 'Error deleting product',
        error: error.message 
      });
    }
  };