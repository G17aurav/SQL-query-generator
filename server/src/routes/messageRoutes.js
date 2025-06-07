const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage } = require('../controllers/messageController');

router.post('/send-message', authMiddleware, sendMessage);

module.exports = router;
