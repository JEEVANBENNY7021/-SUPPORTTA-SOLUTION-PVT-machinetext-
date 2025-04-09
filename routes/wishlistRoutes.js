const express = require('express');
const { auth } = require('../middlewares/auth');
const {
  addToWishlist, removeFromWishlist, getWishlist
} = require('../controllers/wishlistController');

const router = express.Router();
router.post('/add', auth, addToWishlist);
router.post('/remove', auth, removeFromWishlist);
router.get('/', auth, getWishlist);

module.exports = router;
