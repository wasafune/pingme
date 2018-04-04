const { scraper } = require('./scraper.js');

// generate url strings
const genAllUrl = page => `http://www.mangahere.cc/directory/${page}.htm?name.az`;
const genCompletedUrl = page => `http://www.mangahere.cc/completed/${page}.htm?name.az`;
const genLatestUrl = page => `http://www.mangahere.cc/latest/${page}/`;

const extractAllData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  const pTags = $(el).children('p');
  const rating = $(pTags[0]).children('span').html();
  const genres = $(pTags[1]).html().split(', ');
  const latestStr = $(pTags[3]).children('a').html();
  const latest = latestStr.split(' ').slice(-1)[0];
  const time = Date.now();
  return {
    title, rating, genres, latest, time,
  };
};

const extractCompletedData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  return { title };
};

const extractLatestData = (i, el, $) => {
  const title = $(el).find('.manga_info').html();
  const latestStr = $(el).children('dd').children('a').html();
  const latest = latestStr.split(' ').slice(-1)[0];
  // should we get date
  // const time = Date.now();
  return { title, latest };
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
// get rid of when database set up
const breakVal = 'Infection 44';
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'dl',
  iterateCheck,
  breakCheck,
  breakVal,
};

const scrapeAll = (req, res) => {
  scraper(scrapeAllConfig);
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
  extractAllData,
  extractCompletedData,
  iterateCheck,
  scrapeAll,
  scrapeCompleted,
  scrapeLatest,
};