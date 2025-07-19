const express = require('express');
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/verify-email', verifyEmail);
router.post('/signin', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;