const mongoose = require('mongoose');

const mangahere = require('./mangahere').scrapeLatest;
const mangapark = require('./mangapark').scrapeLatest;
const mangastream = require('./mangastream').scrapeLatest;
const {
  updatedMangasCheck,
  updatedMangasDrop,
} = require('./mongoHandler.js');

const { DB_HOST } = process.env;

const updater = async (req, res) => {
  // await updatedMangas drop
  res.send('updater route');
  try {
    // connect to db to drop updatedMangas collection
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    const initCheck = await updatedMangasCheck();
    if (initCheck) await updatedMangasDrop();
    await db.close();
    // drop connection and start updating
    await mangahere();
    await mangapark();
    await mangastream();
    // do something with the updatedMangas
    console.log('Finished updater');
  } catch (err) {
    console.error(err);
  }
};

module.exports = updater;
