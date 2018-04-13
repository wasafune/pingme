const { Router } = require('express');
const { scrapeAll, scrapeCompleted, scrapeLatest } = require('../scrapers/mangahere');


const router = Router();


router.get('/scrapeAll', scrapeAll);
router.get('/scrapeCompleted', scrapeCompleted);
router.get('/scrapeLatest', scrapeLatest);

router.get('/', (req, res) => {
  res.send('scraper mangahere route');
});

module.exports = router;
