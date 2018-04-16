const User = require('../userSchema.js');

const pushToUserSubList = (userId, mangaId) =>
  User.findByIdAndUpdate(userId, { $push: { subscribedList: mangaId } });

const incrementUserSubCt = userId =>
  User.findByIdAndUpdate(userId, { $inc: { subscribedCount: 1 } });

module.exports = {
  pushToUserSubList,
  incrementUserSubCt,
};
