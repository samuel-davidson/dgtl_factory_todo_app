// userModel.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// User schema with proper validation
const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create JWT token method
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
      { id: this._id, email: this.email }, 
      process.env.JWT_KEY || 'default-key',
      { expiresIn: '24h' }
    );
  };

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
const User = mongoose.model('User', userSchema);

// CREATE user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Return user data without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return { user: userResponse, token };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Find user by credentials
const findUserByCredentials = async (email, password) => {
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new Error('Invalid login credentials');
      }
      
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        throw new Error('Invalid login credentials');
      }
      
      // Generate token
      const token = user.generateAuthToken();
      
      // Return user data without password
      const userResponse = user.toObject();
      delete userResponse.password;
      
      return { user: userResponse, token };
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  };

// Find user by ID
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user data without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return userResponse;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

// EXPORT the functions
export { createUser, findUserByCredentials, findUserById };