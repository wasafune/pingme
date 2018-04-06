const cheerio = require('cheerio');
const axios = require('axios');

// generate random int between min and max params
const getRandomInt = (min, max) => Math.floor((Math.random() * Math.floor(max - min)) + min);

// database format title
const parseTitle = (str) => {
  const strArr = str.split('');
  let toggle = false;
  // sanitize special html characters
  const parsedArr = strArr.map((char) => {
    if (toggle) {
      if (char === ';') toggle = false;
      return ' ';
    }
    if (char === '&') {
      toggle = true;
      return ' ';
    }
    return char;
  });
  // sanitize extra spaces and convert spaces, underscore, and dashes into space
  let tempStr = parsedArr.join('').trim().toLowerCase();
  tempStr = tempStr.replace(/-|_/g, ' ');
  tempStr = tempStr.replace(/[^\w\s]/gi, '');
  return tempStr.replace(/\s+/g, ' ');
};

const combineAndKeepUniq = (arr1, arr2) => {
  const combined = arr1.concat(arr2);
  return combined.filter((str, i) => combined.indexOf(str) === i);
};

const pushIfNotIncludes = (arr, str) => {
  const result = arr.slice();
  if (!result.includes(str)) result.push(str);
  return result;
};

const dbSave = (Model, data, source) => {
  const tempData = { ...data };
  tempData.sources = [source];
  const doc = new Model(tempData);
  doc.save((err) => {
    if (err) console.error(err);
  });
};

const dbUpdate = (Model, data, source, res) => {
  const { genres, sources } = res;
  const tempGenres = combineAndKeepUniq(genres, data.genres);
  const tempSources = pushIfNotIncludes(sources, source);
  Model.findOneAndUpdate(
    { dbTitle: data.dbTitle },
    { genres: tempGenres, sources: tempSources },
  );
};

const handleQueries = (Model, data, source) => {
  const { dbTitle } = data;
  Model.findOne({ dbTitle }, (err, res) => {
    if (err) return console.error(err);
    if (!res) {
      return dbSave(Model, data, source);
    }
    return dbUpdate(Model, data, source, res);
  });
};

// iterate matching dom elements, checking if break condition
// if break condition, break loop and return false
// if not break condition, callback on element
const iterateDom = ($, config) => {
  let fullIterate = true;
  let iterateCheck = false;
  $(config.iterateDomEle).each((i, el) => {
    if (!i) iterateCheck = true;
    if (config.breakCheck) {
      if (config.breakCheck(i, el, $) === config.breakVal) {
        fullIterate = false;
        return false;
      }
    }
    const { data, source } = config.extractFunc(i, el, $);
    const { MangaModel } = config;
    handleQueries(MangaModel, data, source);
    return true;
  });
  return fullIterate && iterateCheck;
};

// promise that resolves/rejects based on axios.get call
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

async function scraper(config, db, page = 1) {
  const currUrl = config.genUrlFunc(page);
  console.log('making fetch request');
  try {
    const result = await fetchHTML(currUrl);
    const parsedResult = cheerio.load(result);
    console.log('fetch request success for page', page);
    const fullIterate = iterateDom(parsedResult, config);
    console.log('finished iteration', page);
    if (fullIterate && config.iterateCheck(parsedResult)) {
      setTimeout(() => {
        scraper(config, db, page + 1);
      }, getRandomInt(7000, 15000));
    } else {
      console.log('end loop condition met');
      db.close();
    }
  } catch (err) {
    console.error(Date(), err.message);
    setTimeout(() => {
      scraper(config, db, page + 1);
    }, getRandomInt(10000, 20000));
  }
}

module.exports = {
  getRandomInt,
  parseTitle,
  iterateDom,
  fetchHTML,
  scraper,
};
