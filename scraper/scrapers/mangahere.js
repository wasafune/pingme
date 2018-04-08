const mongoose = require('mongoose');

const { scraper } = require('./scraper.js');
const Bookmark = require('../../mongo/bookmarkSchema');


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
  const source = 'mangahere';
  const type = 'all';
  const data = {
    title, htmlTitle, genres, latest,
  };
  return { source, type, data };
};

const extractCompletedData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  const source = 'mangahere';
  const type = 'completed';
  const data = { title };
  return { source, type, data };
};

const extractLatestData = (i, el, $) => {
  const title = $(el).find('.manga_info').attr('rel');
  const latestStr = $(el).children('dd').children('a').html();
  const latest = Number(latestStr.split(' ').slice(-1)[0]);
  const source = 'mangahere';
  const type = 'latest';
  const data = { title, latest };
  return { source, type, data };
};

const breakCheck = (i, el, $) => {
  const checkStr = $(el).find('dd').find('a').html();
  return checkStr;
};

const iterateCheck = ($) => {
  const check = $('a.next').length;
  return check;
};

const scrapeAllConfig = {
  genUrlFunc: genAllUrl,
  extractFunc: extractAllData,
  iterateDomEle: '.manga_text',
  iterateCheck,
};
const scrapeCompleteConfig = {
  genUrlFunc: genCompletedUrl,
  extractFunc: extractCompletedData,
  iterateDomEle: '.manga_text',
  iterateCheck,
};

const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'dl',
  iterateCheck,
  breakCheck,
};

const scrapeAll = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    scraper(scrapeAllConfig, db);
  });
  res.send('scraper mangahere scrapeAll route');
};

const scrapeCompleted = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    scraper(scrapeCompleteConfig, db);
  });
  res.send('scraper mangahere scrapeCompleted route');
};

const scrapeLatest = (req, res) => {
  mongoose.connect(DB_HOST);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // get bookmark
    Bookmark.findOne({ source: 'mangahere' }, (err, response) => {
      if (err) console.error(err);
      let breakVal;
      if (response) breakVal = `${response.title} ${response.latest}`;
      // breakVal = "Trinity Wonder 57";
      scrapeLatestConfig.breakVal = breakVal;
      scraper(scrapeLatestConfig, db);
    });
  });
  res.send('scraper mangahere scrapeLatest route');
};


module.exports = {
  scrapeAll,
  scrapeCompleted,
  scrapeLatest,
};
