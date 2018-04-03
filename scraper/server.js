const express = require('express');
const path = require('path');

const scraper = require('./controllers/scraperController');

const PORT = process.env.PORT || 8080;
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'src')));

// Middleware
app.use('/scraper', scraper);

// Base route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`);
});
