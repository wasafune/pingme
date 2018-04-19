const mongoose = require('mongoose');

const mangahere = require('./mangahere').scrapeLatest;
const mangapark = require('./mangapark').scrapeLatest;
const mangastream = require('./mangastream').scrapeLatest;
const {
  updatedMangasCheck,
  updatedMangasDrop,
} = require('./mongoHandler.js');

const { DB_HOST } = process.env;

// aggregates and handles the latest updates from the sources
const updater = async (req, res) => {
  res.send('updater route');
  try {
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    const initCheck = await updatedMangasCheck();
    if (initCheck) await updatedMangasDrop();
    await db.close();
    await mangahere();
    await mangapark();
    await mangastream();
    console.log('Finished updater.');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  updater,
};
