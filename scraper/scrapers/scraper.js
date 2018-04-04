const cheerio = require('cheerio');
const axios = require('axios');

const getRandomInt = (min, max) => Math.floor((Math.random() * Math.floor(max - min)) + min);

const iterateDom = ($, config) => {
  let fullIterate = true;
  $(config.iterateDomEle).each((i, el) => {
    if (config.breakCheck) {
      if (config.breakCheck(i, el, $, config.breakVal)) {
        fullIterate = false;
        return false;
      }
    }
    // do something with data from extractFunc with dataHandler
    config.extractFunc(i, el, $);
    return true;
  });
  return fullIterate;
};

const fetchHTML = url => (
  new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

async function awaitFetch(fetchCall, config, page = 1) {
  const currUrl = config.genUrlFunc(page);
  console.log('making fetch request');
  try {
    const result = await fetchCall(currUrl);
    const parsedResult = cheerio.load(result);
    console.log('fetch request success for page', page);
    const fullIterate = iterateDom(parsedResult, config);
    if (fullIterate && config.iterateCheck(parsedResult)) {
      setTimeout(() => {
        awaitFetch(fetchCall, config, page + 1);
      }, getRandomInt(7000, 15000));
    } else console.log('end loop condition met');
  } catch (err) {
    console.error(err.message);
    setTimeout(() => {
      awaitFetch(fetchCall, config, page + 1);
    }, getRandomInt(10000, 20000));
  }
}

const scraper = (config) => {
  awaitFetch(fetchHTML, config);
};

module.exports = {
  getRandomInt,
  iterateDom,
  fetchHTML,
  awaitFetch,
  scraper,
};
