const mongoose = require('mongoose');

const scraper = require('./scraper.js');
const { handleBookmarkGet } = require('./mongoHandler.js');

// change later to remote db
const DB_HOST = process.env.LOCAL_DB;

// generate url strings
const genAllUrl = page => `http://www.mangahere.cc/directory/${page}.htm?name.az`;
const genCompletedUrl = page => `http://www.mangahere.cc/completed/${page}.htm?name.az`;
const genLatestUrl = page => `http://www.mangahere.cc/latest/${page}/`;

const extractAllData = (i, el, $) => {
  const title = $(el).children('div').children('a').attr('title');
  const htmlTitle = $(el).children('div').children('a').html();
  const pTags = $(el).children('p');
  const genres = $(pTags[1]).html().split(', ');
  const latestStr = $(pTags[3]).children('a').html();
  const latest = Number(latestStr.split(' ').slice(-1)[0]);
  return {
    title, htmlTitle, genres, latest,
  };
};

const extractCompletedData = (i, el, $) => {
  const title = $(el).children('div').children('a').attr('title');
  return { title };
};

const extractLatestData = (i, el, $) => {
  const title = $(el).find('.manga_info').attr('rel');
  const latestStr = $(el).children('dd').children('a').html();
  const latest = Number(latestStr.split(' ').slice(-1)[0]);
  return { title, latest };
};

const iterateCheck = ($) => {
  const check = $('a.next').length;
  return check;
};

const source = 'mangahere';

// configs
const scrapeAllConfig = {
  genUrlFunc: genAllUrl,
  extractFunc: extractAllData,
  iterateDomEle: '.manga_text',
  iterateCheck,
  source,
  type: 'all',
};
const scrapeCompleteConfig = {
  genUrlFunc: genCompletedUrl,
  extractFunc: extractCompletedData,
  iterateDomEle: '.manga_text',
  iterateCheck,
  source,
  type: 'complete',
};
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'dl',
  iterateCheck,
  source,
  type: 'latest',
};

const scrapeAll = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    scraper(scrapeAllConfig, db);
    res.send('scraper mangahere scrapeAll route');
  });
};

const scrapeCompleted = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    scraper(scrapeCompleteConfig, db);
    res.send('scraper mangahere scrapeCompleted route');
  });
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
      res.send('mangahere scrapeLatest route');
    } catch (err) {
      res.send(err);
    }
  });
};


module.exports = {
  scrapeAll,
  scrapeCompleted,
  scrapeLatest,
};
