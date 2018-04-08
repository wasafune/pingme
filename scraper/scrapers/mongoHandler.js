/* eslint no-underscore-dangle: 0 */

const Manga = require('../../mongo/mangaSchema');
const UpdatedManga = require('../../mongo/mangaSchema');
const Bookmark = require('../../mongo/bookmarkSchema');

const {
  combineAndKeepUniq,
  pushIfNotIncludes,
  parseTitle,
} = require('./helpers.js');

const dbSave = (MangaModel, data, source) => (
  new Promise((resolve, reject) => {
    const tempData = { ...data };
    tempData.sources = [source];
    const doc = new MangaModel(tempData);
    doc.save((err) => {
      if (err) return reject(err);
      return resolve();
    });
  })
);

const dbUpdateAll = (MangaModel, data, source, res) => (
  new Promise((resolve, reject) => {
    const { genres, sources, _id } = res;
    const tempGenres = combineAndKeepUniq(genres, data.genres);
    const tempSources = pushIfNotIncludes(sources, source);
    MangaModel.findByIdAndUpdate(
      _id,
      { genres: tempGenres, sources: tempSources },
      (err) => {
        if (err) return reject(err);
        return resolve();
      },
    );
  })
);

const dbUpdateCompleted = (MangaModel, data) => (
  new Promise((resolve, reject) => {
    MangaModel.findOneAndUpdate(
      { dbTitle: data.dbTitle },
      { completed: true },
      (err) => {
        if (err) return reject(err);
        return resolve();
      },
    );
  })
);

const mangasUpdateLatest = (MangaModel, _id, latest) => (
  new Promise((resolve, reject) => {
    MangaModel.findByIdAndUpdate(
      _id,
      { latest, updated: Date.now },
      (err) => {
        if (err) return reject(err);
        return resolve();
      },
    );
  })
);

const updatedMangasUpdateLatest = doc => (
  new Promise((resolve, reject) => {
    doc.save((err) => {
      if (err) return reject(err);
      return resolve();
    });
  })
);

async function checkIfLatest(MangaModel, UpdatedMangaModel, data, res) {
  if (data.latest > res.latest) {
    const promiseArr = [];
    promiseArr.push(mangasUpdateLatest(MangaModel, res._id, data.latest));
    const paramObj = {
      _mangaId: res._id,
      dbTitle: res.dbTitle,
    };
    const doc = new UpdatedMangaModel(paramObj);
    promiseArr.push(updatedMangasUpdateLatest(doc));

    await Promise.all(promiseArr);
  }
}

const dbSearch = (MangaModel, dbTitle) => (
  new Promise((resolve, reject) => {
    MangaModel.findOne({ dbTitle }, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  })
);

async function handleQueries(data, type, source) {
  const dbTitle = parseTitle(data.title);
  const updatedData = { ...data };
  updatedData.dbTitle = dbTitle;

  try {
    const result = await dbSearch(Manga, dbTitle);
    if (!result) {
      await dbSave(Manga, updatedData, source);
    } else {
      if (type === 'all') await dbUpdateAll(Manga, updatedData, source, result);
      if (type === 'completed') await dbUpdateCompleted(Manga, updatedData);
      if (type === 'latest') await checkIfLatest(Manga, UpdatedManga, updatedData, result);
    }
  } catch (err) {
    console.error(err);
  }
}

const updateBookmark = (BookmarkModel, source, doc) => (
  new Promise((resolve, reject) => {
    BookmarkModel.findOneAndUpdate({ source }, doc, { upsert: true }, (err) => {
      if (err) reject(err);
      resolve();
    });
  })
);

async function handleFirst(data, type, source) {
  const { title, latest } = data;
  const dbTitle = parseTitle(title);
  const doc = {
    source,
    title,
    dbTitle,
    latest,
  };
  try {
    await updateBookmark(Bookmark, source, doc);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  dbSave,
  dbUpdateAll,
  handleQueries,
  handleFirst,
};
