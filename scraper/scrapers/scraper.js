const axios = require('axios');

const { genRandomInt, delay } = require('./helpers');
const iterateDom = require('./iterateDom');

/*
    **PARAMS**
  config: is specific to each scraper source and type
  db: is db connection object to close connection when scraping is finished
  page: keeps track of current page to scrape, usually starts at 1
  env:
    defaults to live, when not testing
    if testing, it is set to a number to limit recursive calls
  errors: store error messages and stops scraping if too many errors
*/
const scraper = async (config, db, page = 1, env = 'live', errors = []) => {
  let exitVal;
  // change number when only scraping for latest
  if (errors.length >= 30) {
    exitVal = 'Error: Too many errors, closing scraper cycle.';
    throw exitVal;
  }
  const currUrl = config.genUrlFunc(page);
  console.log('making fetch request');
  try {
    const result = await axios.get(currUrl);
    console.log('fetch request success for page', page);
    const fullIterate = await iterateDom(result.data, config, page);
    // if loop didnt break and there is next page to scrape
    if (fullIterate) {
      await delay(genRandomInt(7000, 15000));
      exitVal = `Finished iteration: ${page}`;
      console.log(exitVal);
      if (env === 'live') {
        scraper(config, db, page + 1);
      } else if (env > 1) {
        scraper(config, db, page + 1, env - 1);
      }
      return exitVal;
    }
    // if iteration stop condition met, or nothing to iterate
    exitVal = 'end loop condition met, closing db connection';
    console.log(exitVal);
    db.close();
    return exitVal;
  } catch (err) {
    // error while scraping, attempt to scrape same page again
    exitVal = err.message;
    console.error(exitVal);
    errors.push(exitVal);
    await delay(genRandomInt(10000, 20000));
    if (env === 'live') {
      scraper(config, db, page);
    } else if (env > 1) {
      scraper(config, db, page, env - 1);
    }
    return exitVal;
  }
};

module.exports = scraper;
