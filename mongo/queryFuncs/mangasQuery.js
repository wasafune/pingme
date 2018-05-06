/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const Manga = require('../mangaSchema.js');

// returns array of followed mangas with trimmed properties
// also adds a property "subscribed": Boolean, determined by the user's sub
const retrieveMangas = async (followingList) => {
  const promiseArr = [];
  const subList = {};
  followingList.forEach((obj) => {
    if (obj.subscribed) subList[obj._id] = true;
    promiseArr.push(Manga.findById(obj._id, {
      title: 1,
      genres: 1,
      author: 1,
      latest: 1,
      updated: 1,
      rating: 1,
      followerCount: 1,
      favoritedCount: 1,
    }).lean());
  });
  try {
    const resArr = await Promise.all(promiseArr);
    return resArr.map((obj) => {
      const updatedObj = { ...obj, subscribed: false };
      if (subList[obj._id]) updatedObj.subscribed = true;
      return updatedObj;
    });
  } catch (err) {
    throw err;
  }
};

const searchMangas = async (searchStr, index = 0) =>
  Manga
    .find(
      { $text: { $search: searchStr } },
      {
        score: { $meta: 'textScore' },
        title: 1,
        latest: 1,
        completed: 1,
        followerCount: 1,
        genres: 1,
        updated: 1,
      },
    )
    .skip(index)
    .limit(12)
    .sort({ score: { $meta: 'textScore' } })
    .lean();

module.exports = {
  retrieveMangas,
  searchMangas,
};
