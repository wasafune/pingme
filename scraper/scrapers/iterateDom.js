const cheerio = require('cheerio');

const { handleQueries, handleFirst } = require('./mongoHandler');

// iterate matching dom elements, checking if break condition
// if break condition, break loop
// if not break condition, callback on element and query db

/*   **Params**
  result: fetch request resolve value (HTML DOM)
  config: source/type specific configs
*/
const iterateDom = async (result, config, page) => {
  let fullIterate = true;
  const latestCache = {};
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
    if (type === 'latest') {
      // set bookmark
      if (!i && page === 1) promiseArr.push(handleFirst(data, source));
      // check for the highest latest value of a title
      if (!latestCache[data.title]) {
        latestCache[data.title] = { data, type, source };
      } else if (latestCache[data.title].data.latest < data.latest) {
        latestCache[data.title] = { data, type, source };
      }
    } else {
      promiseArr.push(handleQueries(data, type, source));
    }
  }
  Object.values(latestCache).forEach((obj) => {
    promiseArr.push(handleQueries(obj.data, obj.type, obj.source));
  });
  try {
    await Promise.all(promiseArr);
  } catch (err) {
    console.error(err);
  }
  return fullIterate && config.iterateCheck($);
};


module.exports = iterateDom;
