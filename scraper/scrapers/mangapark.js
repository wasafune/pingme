const { scraper } = require('./scraper.js');

// generate url strings
const genLatestUrl = () => 'https://www.mangapark.me/rss/latest.xml';

const extractLatestData = (i, el, $) => {
  const titleStrArr = $(el).find('title').html().split(' ');
  let latest = titleStrArr.pop();
  latest = latest.slice(3);
  latest = Number(latest).toString();
  const title = titleStrArr.join(' ');
  // should we get date
  return {
    title, latest,
  };
};

const iterateCheck = () => false;

const breakCheck = (i, el, $) => {
  const titleStrArr = $(el).find('title').html().split(' ');
  let latest = titleStrArr.pop();
  latest = latest.slice(3);
  latest = Number(latest).toString();
  const title = titleStrArr.join(' ');
  // should we get date
  return `${title} ${latest}`;
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
  scrapeLatest,
  scrapeLatestConfig,
};
