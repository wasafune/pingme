/* eslint no-underscore-dangle: 0 */

const Manga = require('../../mongo/mangaSchema');
const UpdatedManga = require('../../mongo/updatedMangaSchema');
const Bookmark = require('../../mongo/bookmarkSchema');

const {
  combineAndKeepUniq,
  pushIfNotIncludes,
  parseTitle,
} = require('./helpers.js');

const mangasSearch = (MangaModel, dbTitle) => MangaModel.findOne({ dbTitle });

const mangasSave = (MangaModel, data, source) => {
  const tempData = { ...data };
  tempData.sources = [source];
  const doc = new MangaModel(tempData);
  return doc.save();
};

const mangasUpdateAll = (data, source, res) => {
  const { genres, sources } = res;
  const tempGenres = combineAndKeepUniq(genres, data.genres);
  const tempSources = pushIfNotIncludes(sources, source);
  res.genres = tempGenres;
  res.sources = tempSources;
  return res.save();
};

const mangasUpdateCompleted = (res) => {
  res.completed = true;
  return res.save();
};

const mangasUpdateLatest = (res, latest) => {
  res.latest = latest;
  res.updated = Date.now();
  return res.save();
};

const updatedMangasUpdate = doc => doc.save();

const bookmarkUpdate = (BookmarkModel, source, params) => (
  BookmarkModel.findOneAndUpdate({ source }, params, { upsert: true })
);

async function checkIfLatest(UpdatedMangaModel, data, res) {
  if (data.latest > res.latest) {
    const promiseArr = [];
    promiseArr.push(mangasUpdateLatest(res, data.latest));
    const paramObj = {
      mangaId: res.id,
      dbTitle: res.dbTitle,
    };
    const doc = new UpdatedMangaModel(paramObj);
    promiseArr.push(updatedMangasUpdate(doc));

    await Promise.all(promiseArr);
  }
}

async function handleFirst(data, type, source) {
  const { title, latest } = data;
  const dbTitle = parseTitle(title);
  const params = {
    source, title, dbTitle, latest,
  };
  try {
    await bookmarkUpdate(Bookmark, source, params);
  } catch (err) {
    console.error(err);
  }
}

async function handleQueries(data, type, source) {
  const dbTitle = parseTitle(data.title);
  const updatedData = { ...data };
  updatedData.dbTitle = dbTitle;

  try {
    const result = await mangasSearch(Manga, dbTitle);
    if (!result) {
      await mangasSave(Manga, updatedData, source);
    } else {
      if (type === 'all') await mangasUpdateAll(updatedData, source, result);
      if (type === 'completed') await mangasUpdateCompleted(result);
      if (type === 'latest') await checkIfLatest(UpdatedManga, updatedData, result);
    }
  } catch (err) {
    console.error(err);
  }
}


module.exports = {
  mangasSearch,
  mangasSave,
  mangasUpdateAll,
  mangasUpdateCompleted,
  mangasUpdateLatest,
  updatedMangasUpdate,
  bookmarkUpdate,
  checkIfLatest,
  handleFirst,
  handleQueries,
};
