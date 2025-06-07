const prisma = require('../models/prisma');
const { generateSQL } = require('../services/groqService');

async function sendMessage(req, res) {
  const { conversationId, message } = req.body;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { schema: true, messages: { orderBy: { createdAt: 'asc' } } }
    });

    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });

    const history = conversation.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    const sqlResponse = await generateSQL(conversation.schema.schemaText, history, message);
    await prisma.message.createMany({
      data: [
        { conversationId, role: 'user', content: message },
        { conversationId, role: 'assistant', content: sqlResponse }
      ]
    });

    res.json({ reply: sqlResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { sendMessage };
