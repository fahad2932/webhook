const express = require('express');
const app = express();

// Middleware (if needed)
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Export the app
module.exports = app;
