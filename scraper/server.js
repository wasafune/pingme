const express = require('express');

const scraper = require('./controllers/scraperController');
const { autoUpdate, hourInMilli } = require('./autoUpdate.js');

const PORT = process.env.PORT || 8080;
const app = express();

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
  autoUpdate(hourInMilli * 2);
});
