const User = require('../userSchema.js');

const addFollowing = (userId, mangaId, subscribed = false) =>
  User.findByIdAndUpdate(
    userId,
    {
      $push: { followingList: { _id: mangaId, subscribed } },
      $inc: { followingCount: 1 },
    },
  );

const subscribeFollowing = (userId, mangaId) =>
  User.findOneAndUpdate(
    { _id: userId, 'followingList._id': mangaId },
    { $set: { 'followingList.$.subscribed': true } },
  );

const unsubscribeFollowing = async (userId, mangaId) =>
  User.findOneAndUpdate(
    { _id: userId, 'followingList._id': mangaId },
    { $set: { 'followingList.$.subscribed': false } },
  );

const pullFollower = (userId, mangaId) =>
  User.findByIdAndUpdate(
    userId,
    {
      $pull: { followerList: { mangaId } },
      $inc: { followerCount: -1 },
    },
  );

module.exports = {
  addFollowing,
  subscribeFollowing,
  unsubscribeFollowing,
  pullFollower,
};
