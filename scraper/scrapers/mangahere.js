const mongoose = require('mongoose');

const { parseTitle, scraper } = require('./scraper.js');
const MangaModel = require('../../mongo/mangaSchema');

const DB_HOST = process.env.LOCAL_DB;

// generate url strings
const genAllUrl = page => `http://www.mangahere.cc/directory/${page}.htm?name.az`;
const genCompletedUrl = page => `http://www.mangahere.cc/completed/${page}.htm?name.az`;
const genLatestUrl = page => `http://www.mangahere.cc/latest/${page}/`;

const extractAllData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  const dbTitle = parseTitle(title);
  const pTags = $(el).children('p');
  const genres = $(pTags[1]).html().split(', ');
  const latestStr = $(pTags[3]).children('a').html();
  const latest = Number(latestStr.split(' ').slice(-1)[0]);
  const source = 'mangahere';
  const data = {
    title, dbTitle, genres, latest,
  };
  return { source, data };
};

const extractCompletedData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  return { title };
};

const extractLatestData = (i, el, $) => {
  const title = $(el).find('.manga_info').html();
  const latestStr = $(el).children('dd').children('a').html();
  const latest = latestStr.split(' ').slice(-1)[0];
  return { title, latest };
};

const breakCheck = (i, el, $) => {
  const checkStr = $(el).find('dd').find('a').html();
  return checkStr;
};

// get rid of when database set up
const breakVal = 'Infection 44';

const iterateCheck = ($) => {
  const check = $('a.next').length;
  return check;
};

const scrapeAllConfig = {
  genUrlFunc: genAllUrl,
  extractFunc: extractAllData,
  iterateDomEle: '.manga_text',
  iterateCheck,
  MangaModel,
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
  breakVal,
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
  scraper(scrapeCompleteConfig);
  res.send('scraper mangahere scrapeCompleted route');
};

const scrapeLatest = (req, res) => {
  scraper(scrapeLatestConfig);
  res.send('scraper mangahere scrapeLatest route');
};


module.exports = {
  scrapeAll,
  scrapeCompleted,
  scrapeLatest,
};
