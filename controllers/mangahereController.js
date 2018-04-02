const { Router } = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = Router();

const getRandomInt = (min, max) => Math.floor((Math.random() * Math.floor(max - min)) + min);

const checkNextPage = ($) => {
  const nextPage = $('.next').length;
  return nextPage;
};

const handleData = ($) => {
  $('.manga_text').each((i, el) => {
    const title = $(el).children('div').children('a').html();
    const pTags = $(el).children('p');
    const rating = $(pTags[0]).children('span').html();
    const genres = $(pTags[1]).html().split(', ');
    const latest = $(pTags[3]).children('a').html().split(' ')
      .slice(-1)[0];
  });
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
  console.log('calling');
  try {
    const result = (await fetchCall(currUrl));
    console.log('success fetch');
    const parsedResult = cheerio.load(result);
    handleData(parsedResult);
    if (checkNextPage(parsedResult)) {
      console.log('there is next page', page);
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

router.get('/getList', (req, res) => {
  awaitFetch(fetchHTML);

  res.send('scraper mangahere getList route');
});

router.get('/', (req, res) => {
  res.send('scraper mangahere route');
});

module.exports = router;
