const axios = require('axios');
const { delay } = require('./scrapers/helpers');

const hourInMilli = 60000 * 60;

const autoUpdate = async (intervalTime) => {
  const currTime = new Date();
  const currHour = currTime.getHours();
  console.log('autoUpdate: true, hour: ', currHour)
  // CHANGE BACK tIME
  // if (currHour === 10 || currHour === 11 || currHour === 12) {
  if (currHour === 21 || currHour === 11 || currHour === 12) {
    try {
      await axios.get(process.env.UPDATER_ROUTE);
    } catch (err) {
      console.error(err);
    }
  }
  await delay(intervalTime);
  autoUpdate(intervalTime);
};

// autoUpdate(3600000);
module.exports = {
  autoUpdate,
  hourInMilli,
};
