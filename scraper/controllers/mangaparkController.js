const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  console.log('scraper mangapark route');
});

module.exports = router;
