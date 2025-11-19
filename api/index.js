const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Replace with your verify token
const VERIFY_TOKEN = 'i2c_webhook';

// Meta Webhook verification endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('[GET] /webhook called with mode:', mode, 'token:', token);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WEBHOOK_VERIFIED] Token matches. Responding with challenge.');
    res.status(200).send(challenge);
  } else {
    console.warn('[WEBHOOK_VERIFY_FAILED] Token mismatch or wrong mode.');
    res.sendStatus(403);
  }
});

// Meta Webhook event receiver
app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log('[POST] /webhook received body:', JSON.stringify(body, null, 2));

  if (body.object && body.entry && Array.isArray(body.entry)) {
    body.entry.forEach(entry => {
      if (entry.changes && Array.isArray(entry.changes)) {
        entry.changes.forEach(change => {
          console.log('Change detected:', JSON.stringify(change, null, 2));
        });
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    console.warn('Received unsupported body format.');
    res.sendStatus(404);
  }
});

// Optional root route
app.get('/', (req, res) => {
  res.send('Hello from Express webhook on Vercel!');
});

// Export app directly for Vercel
module.exports = app;
