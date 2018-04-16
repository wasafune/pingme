const Manga = require('../mangaSchema.js');

const pushToMangaSubList = (mangaId, userId) =>
  Manga.findByIdAndUpdate(mangaId, { $push: { subscriberList: userId } });

const incrementMangaSubCt = mangaId =>
  Manga.findByIdAndUpdate(mangaId, { $inc: { subscriberCount: 1 } });

module.exports = {
  pushToMangaSubList,
  incrementMangaSubCt,
};
