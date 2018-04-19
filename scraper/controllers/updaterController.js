const { Router } = require('express');
const { updater } = require('../scrapers/updater');


const router = new Router();

router.get('/', updater);

module.exports = router;
