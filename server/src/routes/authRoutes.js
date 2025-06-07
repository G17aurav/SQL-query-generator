const express = require('express');
const router = express.Router();
const {
  register, login, forgotPassword, verifyOtp, resetPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
