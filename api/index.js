// Import Express.js
const express = require('express');
 
// Create an Express app
const app = express();
 
// Middleware to parse JSON bodies
app.use(express.json());
 
// Set port and verify_token
const verifyToken = "usama";
 
// Route for GET requests
app.get('/webhook', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
 
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});
 
// Route for POST requests
app.post('/webhook', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

app.get('/', (req, res) => {
  res.send('Hello from i2c webhook on Vercel!');
});

// Start the server
// Export app directly for Vercel
module.exports = app;




