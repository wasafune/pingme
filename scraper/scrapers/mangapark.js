const { scraper } = require('./scraper.js');

// generate url strings
const genLatestUrl = () => 'https://www.mangapark.me/rss/latest.xml';

const extractLatestData = (i, el, $) => {
  const titleStrArr = $(el).find('title').html().split(' ');
  const latest = titleStrArr.pop();
  const title = titleStrArr.join(' ');
  // should we get date
  // const time = Date.now();
  return {
    title, latest,
  };
};

const iterateCheck = () => false;

const breakCheck = (i, el, $) => {
  const checkStr = $(el).find('title').html();
  return checkStr;
};

const breakVal = 'Donten ni Warau Gaiden ch.016';
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: 'item',
  iterateCheck,
  breakCheck,
  breakVal,
};

const scrapeLatest = (req, res) => {
  scraper(scrapeLatestConfig);
  res.send('scraper mangapark scrapeLatest route');
};

module.exports = {
  extractLatestData,
  scrapeLatest,
};
