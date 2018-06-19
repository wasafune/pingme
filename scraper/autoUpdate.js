const axios = require('axios');
const { delay } = require('./scrapers/helpers');

const hourInMilli = 60000 * 60;
const localUrl = 'http://localhost:8080/scraper/updater';

// params:
// intervalTime - milliseconds for intervals
// manual - set to true for immediate one time update
const autoUpdate = async (intervalTime, manual) => {
  const currTime = new Date();
  const currHour = currTime.getHours();
  if (currHour === 17 || currHour === 18 || currHour === 19 || manual) {
    try {
      await axios.get(process.env.UPDATER_ROUTE || localUrl);
    } catch (err) {
      console.error(err);
    }
  }
  if (manual) return;
  await delay(intervalTime);
  autoUpdate(intervalTime);
};

// run update one time (for 'npm run updater' script)
if (!process.env.PORT && !process.env.LOCAL_USER) {
  autoUpdate(0, true);
}

module.exports = {
  autoUpdate,
  hourInMilli,
};
