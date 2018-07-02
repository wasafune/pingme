const User = require('../userSchema.js');

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

const toggleNotifications = (userId, bool) =>
  User.findByIdAndUpdate(
    userId,
    {
      $set: { notifications: bool },
    },
  );

const pushNotifications = (updatedArr) => {
  const promiseArr = [];
  updatedArr.forEach((obj) => {
    const {
      _id, title, latest, followerList,
    } = obj.manga;
    const subscribedArr = followerList
      .filter(userObj => userObj.subscribed)
      .map(userObj => userObj._id);
    const userUpdate = User
      .where({ _id: { $in: subscribedArr } })
      .update({ $push: { notificationStack: { _id, title, latest } } });
    promiseArr.push(userUpdate);
  });
  return Promise.all(promiseArr);
};

const pullAllNotifications = userId =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { notificationStack: {} } },
  );

const purgeAllNotifications = () =>
  User
    .updateMany({}, { $pull: { notificationStack: {} } })
    .where('notificationStack.0')
    .exists();

// reduces notificationStack into object
// reduce duplicate titles into one title with the greatest latest value
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
  pushFollowing,
  subscribeFollowing,
  unsubscribeFollowing,
  pullFollowing,
  toggleNotifications,
  pushNotifications,
  pullAllNotifications,
  purgeAllNotifications,
  retrieveNotifications,
};
