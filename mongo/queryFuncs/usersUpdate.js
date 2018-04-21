/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const User = require('../userSchema.js');

const sendUserInfo = userId => User.findById(userId).lean();

// if new following and subscribing, pass in true for subscriber
const pushFollowing = (userId, mangaId, subscribed = false) =>
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

const unsubscribeFollowing = (userId, mangaId) =>
  User.findOneAndUpdate(
    { _id: userId, 'followingList._id': mangaId },
    { $set: { 'followingList.$.subscribed': false } },
  );

const pullFollowing = (userId, mangaId) =>
  User.findByIdAndUpdate(
    userId,
    {
      $pull: { followingList: { _id: mangaId } },
      $inc: { followingCount: -1 },
    },
  );

const pushNotification = (userId, mangaId, title, latest) =>
  User.findByIdAndUpdate(
    userId,
    { $push: { notificationStack: { _id: mangaId, title, latest } } },
  );

const pullAllNotifications = userId =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { notificationStack: {} } },
  );

// reduces notificationStack into object
// reduces mutliple titles into one title with the greatest latest value
const retrieveNotifications = async (userId) => {
  try {
    const res = await User.findById(userId, { _id: 0, notificationStack: 1 }).lean();
    return res.notificationStack.reduce((acc, ele) => {
      if (acc[ele._id]) {
        if (acc[ele._id].latest < ele.latest) acc[ele._id].latest = ele.latest;
        return acc;
      }
      acc[ele._id] = ele;
      return acc;
    }, {});
  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendUserInfo,
  pushFollowing,
  subscribeFollowing,
  unsubscribeFollowing,
  pullFollowing,
  pushNotification,
  pullAllNotifications,
  retrieveNotifications,
};
