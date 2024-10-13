import Account from '../models/Account.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Register a new user
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Account.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const user = new Account({ username, password });
    await user.save();

    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login attempt:', { username, password });

    const user = await Account.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(404).render('login', { error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).render('login', { error: 'Invalid credentials' });
    }

    res.cookie('token', generateToken(user._id), { httpOnly: true });
    res.redirect('/dashboard');
  } catch (error) {
    console.log('Error during login:', error);
    res.status(500).render('login', { error: error.message });
  }
};
export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};