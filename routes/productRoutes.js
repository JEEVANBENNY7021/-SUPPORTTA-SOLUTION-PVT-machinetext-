const express = require('express');
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const {
  createProduct, getAllProducts, getProductDetails,
  updateProduct, deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductDetails);
router.post('/', auth, upload.single('image'), createProduct);
router.put('/:id', auth, upload.single('image'), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
