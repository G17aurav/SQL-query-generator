const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { startConversation, getConversation, getConversationsByUser } = require('../controllers/conversationController');

router.post('/start-conversation', authMiddleware, startConversation);
router.get('/get-conversation/:id', authMiddleware, getConversation);
router.get('/conversations/user/:userId', authMiddleware, getConversationsByUser);

module.exports = router;
