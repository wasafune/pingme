const { Router } = require('express');
const { scrapeAll, scrapeCompleted, scrapeLatest } = require('../scrapers/nineanime');


const router = new Router();


router.get('/scrapeAll', scrapeAll);
router.get('/scrapeCompleted', scrapeCompleted);
router.get('/scrapeLatest', scrapeLatest);

router.get('/', (req, res) => {
  res.send('scraper nineanime route');
});

module.exports = router;
