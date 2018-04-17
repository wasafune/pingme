const { Router } = require('express');

const updater = require('../scrapers/updater');
const mangahereController = require('./mangahereController');
const mangaparkController = require('./mangaparkController');
const mangastreamController = require('./mangastreamController');

const router = new Router();

// Middleware
router.use('/updater', updater);
router.use('/mangahere', mangahereController);
router.use('/mangapark', mangaparkController);
router.use('/mangastream', mangastreamController);

router.get('/', (req, res) => {
  res.send('scraper base route');
});


module.exports = router;
