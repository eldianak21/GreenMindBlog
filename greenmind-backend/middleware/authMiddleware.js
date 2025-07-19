const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const [user] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);

      if (user.length === 0) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      req.user = user[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };