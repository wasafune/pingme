const { Router } = require('express');

const mangaparkController = require('./mangaparkController');
const mangahereController = require('./mangahereController');

const router = Router();

// Middleware
router.use('/mangapark', mangaparkController);
router.use('/mangahere', mangahereController);

router.get('/', (req, res) => {
  res.send('scraper base route');
});


module.exports = router;
