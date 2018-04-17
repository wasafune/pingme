const mangahere = require('./mangahere').scrapeLatest;
const mangapark = require('./mangapark').scrapeLatest;
const mangastream = require('./mangastream').scrapeLatest;

const updater = async (req, res) => {
  // await updatedMangas drop
  res.send('updater route');
  try {
    await mangahere();
    await mangapark();
    await mangastream();
    // do something with the updatedMangas
    return 'Finished updater.';
  } catch (err) {
    return err;
  }
};

module.exports = updater;
