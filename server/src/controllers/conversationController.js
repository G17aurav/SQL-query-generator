const prisma = require("../models/prisma");

async function startConversation(req, res) {
  const { title, schemaText } = req.body;
  const userId = req.user?.id || req.body.userId; // From authMiddleware or body fallback

  if (!title || !schemaText || !userId) {
    return res
      .status(400)
      .json({ error: "title, schemaText, and userId are required" });
  }

  try {
    const conversation = await prisma.conversation.create({
      data: {
        title,
        userId, // Use the scalar userId field
        schema: {
          create: {
            schemaText,
          },
        },
      },
      include: {
        schema: true,
      },
    });

    res.json(conversation);
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

async function getConversationsByUser(req, res) {
  try {
    const { userId } = req.params;
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      include: { schema: true, messages: { orderBy: { createdAt: "asc" } } },
    });
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { startConversation, getConversation, getConversationsByUser };
