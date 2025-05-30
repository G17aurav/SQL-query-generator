const express = require('express');
const router = express.Router();
const { startConversation, getConversation } = require('../controllers/conversationController');

router.post('/start-conversation', startConversation);
router.get('/get-conversation/:id', getConversation);

module.exports = router;
