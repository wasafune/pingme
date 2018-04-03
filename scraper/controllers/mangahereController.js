const { Router } = require('express');
const { scrapeAll } = require('../scrapers/mangahere');


const router = Router();


router.get('/scrapeAll', scrapeAll);

router.get('/', (req, res) => {
  res.send('scraper mangahere route');
});

module.exports = router;
