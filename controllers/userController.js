const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateUserId = require('../utils/userIdGenerator');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    userId: generateUserId('user')
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Create token with additional user data
      const token = jwt.sign(
        {
          userId: user.userId,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

exports.registerAdmin = async (req, res) => {
    try {
      const { name, email, password, secretKey } = req.body;
      
      if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ 
          success: false,
          message: 'Invalid admin secret key' 
        });
      }
  
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email and password are required'
        });
      }
  
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        userId: generateUserId('admin')
      });
  
      await newUser.save();
      
      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        user: {
          userId: newUser.userId,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };