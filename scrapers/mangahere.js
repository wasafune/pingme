const cheerio = require('cheerio');
const axios = require('axios');

const getRandomInt = (min, max) => Math.floor((Math.random() * Math.floor(max - min)) + min);

const checkNextPage = ($) => {
  const nextPage = $('.next').length;
  return nextPage;
};

const iterateDom = ($, element, callback) => {
  $(element).each((i, el) => {
    callback(i, el, $);
  });
};

const extractData = (i, el, $) => {
  const title = $(el).children('div').children('a').html();
  const pTags = $(el).children('p');
  const rating = $(pTags[0]).children('span').html();
  const genres = $(pTags[1]).html().split(', ');
  const latestStr = $(pTags[3]).children('a').html();
  const latest = latestStr.split(' ').slice(-1)[0];
  return {
    title, rating, genres, latest,
  };
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

async function awaitFetch(fetchCall, page = 1) {
  const currUrl = `http://www.mangahere.cc/directory/${page}.htm?name.az`;
  console.log('making fetch request');
  try {
    const result = await fetchCall(currUrl);
    const parsedResult = cheerio.load(result);
    console.log('fetch request success for ', page);
    iterateDom(parsedResult, '.manga_text', extractData);
    if (checkNextPage(parsedResult)) {
      setTimeout(() => {
        awaitFetch(fetchCall, page + 1);
      }, getRandomInt(5000, 15000));
    }
  } catch (err) {
    console.error(err.message);
    setTimeout(() => {
      awaitFetch(fetchCall, page);
    }, getRandomInt(5000, 15000));
  }
}

const scrapeAll = (req, res) => {
  awaitFetch(fetchHTML);
  res.send('scraper mangahere getList route');
};


module.exports = {
  getRandomInt,
  checkNextPage,
  iterateDom,
  extractData,
  fetchHTML,
  awaitFetch,
  scrapeAll,
};
