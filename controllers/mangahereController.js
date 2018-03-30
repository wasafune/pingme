const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  console.log('scraper mangahere route');
});

module.exports = router;
