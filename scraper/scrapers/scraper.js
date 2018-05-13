const axios = require('axios');

const { genRandomInt, delay } = require('./helpers');
const iterateDom = require('./iterateDom');

/*   **PARAMS**
  config: is specific to each scraper source and type
  db: is db connection object to close connection when scraping is finished
  page: keeps track of current page to scrape, usually starts at 1
  errors: store error messages and stops scraping if too many errors
*/
const scraper = async (config, page = 173, errors = []) => {
  // change number when only scraping for latest
  if (errors.length >= 30) throw Error(JSON.stringify(errors));

  const currUrl = config.genUrlFunc(page);
  try {
    const result = await axios.get(currUrl);
    console.log('fetch request success for page', page);
    const fullIterate = await iterateDom(result.data, config, page);
    console.log(`Finished iteration: ${page}`);
    // if loop didnt break and there is next page to scrape
    if (fullIterate) {
      await delay(genRandomInt(11000, 16000));
      return scraper(config, page + 1, errors);
    }
  } catch (err) {
    // error while scraping, attempt to scrape same page again
    console.error(err.message);
    errors.push(err.message);
    await delay(genRandomInt(14000, 20000));
    return scraper(config, page, errors);
  }
  // scaping complete
  const exitObj = {
    msg: 'End condition met.',
    page,
  };
  return exitObj;
};

module.exports = scraper;
