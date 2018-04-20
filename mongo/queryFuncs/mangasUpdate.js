const Manga = require('../mangaSchema.js');

// if new follower and subscribing, pass in true for subscriber
const addFollower = (mangaId, userId, subscribed = false) =>
  Manga.findByIdAndUpdate(
    mangaId,
    {
      $push: { followerList: { userId, subscribed } },
      $inc: { followerCount: 1 },
    },
  );

const subscribeFollower = (mangaId, userId) =>
  Manga.findOneAndUpdate(
    { _id: mangaId, 'followerList.userId': userId },
    { $set: { 'followerList.$.subscribed': true } },
  );

const unsubscribeFollower = async (mangaId, userId) =>
  Manga.findOneAndUpdate(
    { _id: mangaId, 'followerList.userId': userId },
    { $set: { 'followerList.$.subscribed': false } },
  );

const pullFollower = (mangaId, userId) =>
  Manga.findByIdAndUpdate(
    mangaId,
    {
      $pull: { followerList: { userId } },
      $inc: { followerCount: -1 },
    },
  );

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
  addFollower,
  subscribeFollower,
  unsubscribeFollower,
  pullFollower,
  retrieveMangas,
};
