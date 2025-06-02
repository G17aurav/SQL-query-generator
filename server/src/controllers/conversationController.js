const prisma = require("../models/prisma");

async function startConversation(req, res) {
  const { title, schemaText, userId } = req.body;

  if (!title || !schemaText) {
    return res.status(404).json({ error: "Title and schemaText are required" });
  }
  try {
    const conversation = await prisma.conversation.create({
      data: { title, userId },
    });

    const schema = await prisma.schema.create({
      data: {
        conversationId: conversation.id,
        schemaText,
      },
    });
    res.json({ ...conversation, schema });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getConversation(req, res) {
  const { id } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: { schema: true, messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!conversation) return res.status(404).json({ error: "Not found" });
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { startConversation, getConversation };
