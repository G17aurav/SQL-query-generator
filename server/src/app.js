const express = require('express');
const cors = require('cors');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);

module.exports = app;
