// authController.mjs
import express from 'express';
import jwt from 'jsonwebtoken';
import * as user from './userModel.mjs';
import 'dotenv/config';

const router = express.Router();

// Authentication middleware
export const auth = async (req, res, next) => {
  try {
    // Check for token in headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY || 'default-key');
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Register user
router.post('/signup', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const { user: newUser, token } = await user.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    
    console.log(`User created: ${newUser._id}`);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error in POST /signup:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
    
    res.status(500).json({ error: 'Failed to create user', message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const { user: authenticatedUser, token } = await user.findUserByCredentials(
      req.body.email,
      req.body.password
    );
    
    console.log(`User logged in: ${authenticatedUser._id}`);
    res.json({ user: authenticatedUser, token });
  } catch (error) {
    console.error('Error in POST /login:', error);
    
    // Keep error messages generic for security
    if (error.message === 'Invalid login credentials') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const currentUser = await user.findUserById(req.user.id);
    res.json(currentUser);
  } catch (error) {
    console.error('Error in GET /me:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile', message: error.message });
  }
});

export default router;