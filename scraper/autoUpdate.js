const axios = require('axios');
const { delay } = require('./scrapers/helpers');

const checkTime = async (intervalTime) => {
  try {
    await axios.get('http://localhost:8080/scraper/updater');
  } catch (err) {
    console.error(err);
  }
  await delay(intervalTime, intervalTime);
  checkTime(intervalTime);
};

checkTime(3600000);
