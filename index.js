const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const app = express();
const port = 8000;

// Middleware to allow all CORS origins
app.use(cors());

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for Base64 encoding
app.post('/encode', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text in the request body' });
  }

  const encodedText = Buffer.from(text).toString('base64');
  res.json({ encodedText });
});

// Endpoint for Base64 decoding
app.post('/decode', (req, res) => {
  const { encodedText } = req.body;

  if (!encodedText) {
    return res.status(400).json({ error: 'Missing encodedText in the request body' });
  }

  const decodedText = Buffer.from(encodedText, 'base64').toString('utf-8');
  res.json({ decodedText });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
