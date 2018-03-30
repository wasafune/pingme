const { Router } = require('express');

const kissmangaController = require('./kissmangaController');
const mangahereController = require('./mangahereController');

const router = Router();

// Middleware
router.use('/kissmanga', kissmangaController);
router.use('/mangahere', mangahereController);

router.get('/', (req, res, next) => {
  console.log('scraper base route');
});


module.exports = router;
