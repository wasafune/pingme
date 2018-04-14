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

// configs
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'item',
  iterateCheck,
  source,
  type: 'latest',
};

const scrapeLatest = async (req, res) => {
  res.send('mangapark scrapeLatest route');
  try {
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    const bookmarkStr = await handleBookmarkGet(source);
    scrapeLatestConfig.breakVal = bookmarkStr;
    const exitObj = await scraper(scrapeLatestConfig);
    console.log(exitObj);
    db.close();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  scrapeLatest,
  scrapeLatestConfig,
};
