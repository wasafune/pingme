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


module.exports = {
  addFollower,
  subscribeFollower,
  unsubscribeFollower,
  pullFollower,
};
