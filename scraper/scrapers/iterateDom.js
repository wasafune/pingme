const cheerio = require('cheerio');

const { handleQueries, handleFirst } = require('./mongoHandler');

// iterate matching dom elements, checking if break condition
// if break condition, break loop
// if not break condition, callback on element and query db
const iterateDom = async (result, config, page) => {
  let fullIterate = true;
  const promiseArr = [];
  const $ = cheerio.load(result);

  const domElements = $(config.iterateDomEle);
  // filter out non-number keys
  const domElementsKeys = Object.keys(domElements).filter(key => (
    Number(key) || key === '0'
  ));

  if (!domElementsKeys.length) return false;
  for (let i = 0; i < domElementsKeys.length; i += 1) {
    const el = domElements[i];
    const data = config.extractFunc(i, el, $);
    const { source, type } = config;

    if (config.breakVal) {
      if (`${data.title} ${data.latest}` === config.breakVal) {
        fullIterate = false;
        break;
      }
    }
    if (!i && type === 'latest' && page === 1) {
      promiseArr.push(handleFirst(data, type, source));
    }
    promiseArr.push(handleQueries(data, type, source));
  }
  try {
    await Promise.all(promiseArr);
  } catch (err) {
    console.error(err);
  }
  return fullIterate && config.iterateCheck($);
};


module.exports = iterateDom;
