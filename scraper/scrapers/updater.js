const mongoose = require('mongoose');

const mangahere = require('./mangahere').scrapeLatest;
const mangapark = require('./mangapark').scrapeLatest;
const mangastream = require('./mangastream').scrapeLatest;
const nineanime = require('./nineanime').scrapeLatest;
const {
  updatedMangasCheck,
  updatedMangasDrop,
  updatedMangasRetrieve,
} = require('./mongoHandler.js');
const { pushNotifications, purgeAllNotifications } = require('../../mongo/queryFuncs/usersUpdate');
const { getNotifyList } = require('../../mongo/queryFuncs/usersQuery');
const { emailUsers } = require('./emailFuncs');

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
    await nineanime();
    await mongoose.connect(DB_HOST);
    const updatedArr = await updatedMangasRetrieve();
    await pushNotifications(updatedArr);
    const notifyList = await getNotifyList();
    await emailUsers(notifyList);
    await purgeAllNotifications();
    console.log('Finished updater.');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  updater,
};
