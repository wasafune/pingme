const { Router } = require('express');
const { scrapeLatest } = require('../scrapers/mangapark');


const router = Router();


router.get('/scrapeLatest', scrapeLatest);
// router.get('/scrapeCompleted', scrapeCompleted);
// router.get('/scrapeLatest', scrapeLatest);

router.get('/', (req, res) => {
  res.send('scraper mangapark route');
});

module.exports = router;
