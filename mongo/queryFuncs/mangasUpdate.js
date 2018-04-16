const Manga = require('../mangaSchema.js');

const pushToMangaSubList = (mangaId, userId) =>
  Manga.findByIdAndUpdate(mangaId, { $push: { subscriberList: userId } });

const incrementMangaSubCt = mangaId =>
  Manga.findByIdAndUpdate(mangaId, { $inc: { subscriberCount: 1 } });

const retrieveMangas = async (idsArr) => {
  const promiseArr = [];
  idsArr.forEach((id) => {
    promiseArr.push(Manga.findById(id));
  });
  try {
    return await Promise.all(promiseArr);
  } catch (err) {
    return err;
  }
};

module.exports = {
  pushToMangaSubList,
  incrementMangaSubCt,
  retrieveMangas,
};
