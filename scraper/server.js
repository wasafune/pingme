const express = require('express');
const mongoose = require('mongoose');

const scraper = require('./controllers/scraperController');

const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.DB_HOST);

// Middleware
app.use('/scraper', scraper);

// Base route
app.get('/', (req, res) => {
  res.send('git ready to scrape');
});

// Start server
app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`);
});
