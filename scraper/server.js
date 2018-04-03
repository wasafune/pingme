const express = require('express');
// const path = require('path');

require('dotenv').config();
const scraper = require('./controllers/scraperController');

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use('/scraper', scraper);

// Base route
app.get('/', (req, res) => {
  res.send('git ready to scrape');
});

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`);
});
