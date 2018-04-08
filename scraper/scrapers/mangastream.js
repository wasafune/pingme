const { scraper } = require('./scraper.js');

const genLatestUrl = () => 'https://readms.net/';

const extractLatestData = (i, el, $) => {
  const parent = $(el).parent();
  let title = '';
  $(parent).contents().each((index, elem) => {
    if (elem.type === 'text') {
      title = elem.data.trim();
      return false;
    }
    return true;
  });
  const latest = $(parent).find('strong').html();
  return {
    title, latest,
  };
};

const iterateCheck = () => false;

const breakCheck = (i, el, $) => {
  const parent = $(el).parent();
  let title = '';
  $(parent).contents().each((index, elem) => {
    if (elem.type === 'text') {
      title = elem.data.trim();
      return false;
    }
    return true;
  });
  const latest = $(parent).find('strong').html();
  const checkStr = `${title} ${latest}`;
  return checkStr;
};

const breakVal = 'Hunter x Hunter 380';
const scrapeLatestConfig = {
  genUrlFunc: genLatestUrl,
  extractFunc: extractLatestData,
  iterateDomEle: '.pull-right',
  iterateCheck,
  breakCheck,
  breakVal,
};

const scrapeLatest = (req, res) => {
  scraper(scrapeLatestConfig);
  res.send('scraper mangastream scrapeLatest route');
};

module.exports = {
  scrapeLatest,
  scrapeLatestConfig,
};
