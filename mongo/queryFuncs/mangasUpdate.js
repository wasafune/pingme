/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const Manga = require('../mangaSchema.js');

// if new follower and subscribing, pass in true for subscriber
const addFollower = (mangaId, userId, subscribed = false) =>
  Manga.findByIdAndUpdate(
    mangaId,
    {
      $push: { followerList: { _id: userId, subscribed } },
      $inc: { followerCount: 1 },
    },
  );

const subscribeFollower = (mangaId, userId) =>
  Manga.findOneAndUpdate(
    { _id: mangaId, 'followerList._id': userId },
    { $set: { 'followerList.$.subscribed': true } },
  );

const unsubscribeFollower = (mangaId, userId) =>
  Manga.findOneAndUpdate(
    { _id: mangaId, 'followerList._id': userId },
    { $set: { 'followerList.$.subscribed': false } },
  );

const pullFollower = (mangaId, userId) =>
  Manga.findByIdAndUpdate(
    mangaId,
    {
      $pull: { followerList: { _id: userId } },
      $inc: { followerCount: -1 },
    },
  );

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

module.exports = {
  addFollower,
  subscribeFollower,
  unsubscribeFollower,
  pullFollower,
  retrieveMangas,
};
