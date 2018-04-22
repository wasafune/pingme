const mongoose = require('mongoose');

const Manga = require('../mongo/mangaSchema');

const { DB_HOST } = process.env;

// aggregates and handles the latest updates from the sources
const updateAltTitle = async (dbTitle, altTitleArr) => {
  try {
    await mongoose.connect(DB_HOST);
    const db = mongoose.connection;
    await Manga.findOneAndUpdate({ dbTitle }, {
      $push: { altTitle: altTitleArr },
    });
    await db.close();
    console.log('Finished updateAltTitle.');
  } catch (err) {
    console.error(err);
  }
};

const tempArr = ['One Punch Man', 'onepunchman', 'one-punch-man', 'one-punch man'];
updateAltTitle('onepunch man', tempArr);
