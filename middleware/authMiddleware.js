import jwt from 'jsonwebtoken';
import Account from '../models/Account.js';

export const protect = async (req, res, next) => {
  let token;
  
  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Account.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).redirect('/login'); // Redirect to login page if token verification fails
    }
  } else {
    res.status(401).redirect('/login'); // Redirect to login page if no token is found
  }
};