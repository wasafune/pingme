const { Router } = require('express');
const { scrapeLatest } = require('../scrapers/mangastream');


const router = new Router();


router.get('/scrapeLatest', scrapeLatest);

router.get('/', (req, res) => {
  res.send('scraper mangastream route');
});

module.exports = router;
