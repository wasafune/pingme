const mongoose = require('mongoose');

const scraper = require('./scraper.js');
const { handleBookmarkGet } = require('./mongoHandler.js');

const { DB_HOST } = process.env;
// const DB_HOST = 'mongodb://127.0.0.1:27017/pingme';

// generate url strings
const genAllUrl = page => `https://www4.9anime.is/updated?page=${page}`;
// const genCompletedUrl = page => `https://www4.9anime.is/updated?page=${page}`;
const genLatestUrl = page => `https://www4.9anime.is/updated?page=${page}`;

const extractAllData = (i, el, $) => {
  const title = $(el).next().html();
  const altTitle = [$(el).next().attr('data-jtitle')];
  const latestStr = $(el).find('.ep').length ? $(el).find('.ep').html() : '';
  const latest = latestStr.length
    ? Number(latestStr.split('/')[0].split(' ')[2]) || 0
    : 0;
  const completed = true;
  const anime = true;
  return {
    title, altTitle, latest, completed, anime,
  };
};

// const extractCompletedData = (i, el, $) => {
//   const title = $(el).children('div').children('a').attr('title');
//   return { title };
// };

const extractLatestData = (i, el, $) => {
  const title = $(el).find('.manga_info').attr('rel');
  const latestStr = $(el).children('dd').children('a').html();
  const latest = Number(latestStr.split(' ').slice(-1)[0]);
  return { title, latest };
};

const iterateCheck = ($) => {
  const check = !$('a.btn.btn-lg.btn-primary.pull-right.disabled').length;
  return check;
};
const iterateCheckLatest = () => false;


const source = '9anime';

// configs
const scrapeAllConfig = {
  genUrlFunc: genAllUrl,
  extractFunc: extractAllData,
  iterateDomEle: 'a.poster',
  iterateCheck,
  source,
  type: 'all',
};
// const scrapeCompletedConfig = {
//   genUrlFunc: genCompletedUrl,
//   extractFunc: extractCompletedData,
//   iterateDomEle: '.manga_text',
//   iterateCheck,
//   source,
//   type: 'completed',
// };
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'dl',
  iterateCheck: iterateCheckLatest,
  source,
  type: 'latest',
};

const scrapeAll = async (req, res) => {
  res.send('scraper mangahere scrapeAll route');
  try {
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    const exitObj = await scraper(scrapeAllConfig);
    console.log(exitObj);
    await db.close();
  } catch (err) {
    console.error(err);
  }
};

// const scrapeCompleted = async (req, res) => {
//   res.send('scraper mangahere scrapeCompleted route');
//   try {
//     await mongoose.connect(DB_HOST);
//     const db = mongoose.connection;
//     const exitObj = await scraper(scrapeCompletedConfig);
//     console.log(exitObj);
//     await db.close();
//   } catch (err) {
//     console.error(err);
//   }
// };

const scrapeLatest = async (req, res) => {
  if (res) res.send('mangahere scrapeLatest route');
  try {
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    const bookmarkStr = await handleBookmarkGet(source);
    scrapeLatestConfig.breakVal = bookmarkStr;
    const exitObj = await scraper(scrapeLatestConfig);
    console.log(exitObj);
    await db.close();
    return exitObj;
  } catch (err) {
    console.log(err);
    return err;
  }
};


module.exports = {
  scrapeAll,
  // scrapeCompleted,
  scrapeLatest,
  scrapeAllConfig,
  // scrapeCompletedConfig,
  scrapeLatestConfig,
};
