const express = require('express');
const { register, login, registerAdmin } = require('../controllers/userController');
const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`Request received for: ${req.method} ${req.path}`);
  next();
});

// Routes
router.post('/register', register);
router.post('/register/admin', registerAdmin);
router.post('/login', login);


module.exports = router;