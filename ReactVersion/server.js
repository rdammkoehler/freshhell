const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the Vite build output
app.use(express.static(path.join(__dirname, 'dist')));

// Return the SPA index for all unmatched routes (Express 5 named wildcard syntax)
app.get('/{*splat}', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the app on the Heroku-assigned port or fall back to 8080
app.listen(process.env.PORT || 8080);
