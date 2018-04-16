const User = require('../userSchema.js');

const pushToUserSubList = (userId, mangaId) =>
  User.findByIdAndUpdate(userId, { $push: { subscribedList: mangaId } });

const incrementUserSubCt = userId =>
  User.findByIdAndUpdate(userId, { $inc: { subscribedCount: 1 } });

const pullFromUserSubList = (userId, mangaId) =>
  User.findByIdAndUpdate(userId, { $pull: { subscribedList: mangaId } });

const decrementUserSubCt = userId =>
  User.findByIdAndUpdate(userId, { $inc: { subscribedCount: -1 } });

module.exports = {
  pushToUserSubList,
  incrementUserSubCt,
  pullFromUserSubList,
  decrementUserSubCt,
};
