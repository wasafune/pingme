const mongoose = require('mongoose');

const { scraper } = require('./scraper.js');
const { handleBookmarkGet } = require('./mongoHandler.js');

// change later to remote db
const DB_HOST = process.env.LOCAL_DB;

// generate url strings
const genLatestUrl = () => 'https://www.mangapark.me/rss/latest.xml';

const extractLatestData = (i, el, $) => {
  const titleStrArr = $(el).find('title').html().split(' ');
  const latestStr = titleStrArr.pop();
  const latest = Number(latestStr.slice(3));
  const title = titleStrArr.join(' ');
  return { title, latest };
};

const iterateCheck = () => false;

const source = 'mangapark';

// config
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'item',
  iterateCheck,
  source,
  type: 'latest',
};

const scrapeLatest = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    try {
      const bookmarkStr = await handleBookmarkGet(source);
      scrapeLatestConfig.breakVal = bookmarkStr;
      scraper(scrapeLatestConfig, db);
      res.send('mangapark scrapeLatest route');
    } catch (err) {
      res.send(err);
    }
  });
};

module.exports = {
  scrapeLatest,
  scrapeLatestConfig,
};
