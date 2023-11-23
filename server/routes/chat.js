// server.js
const express = require('express');
const axios = require('axios');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.post('/chat', async (req, res) => {
  const { input } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: input,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_OPENAI_API_KEY',
        },
      }
    );

    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).send('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
