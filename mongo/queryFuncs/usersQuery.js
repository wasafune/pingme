const User = require('../userSchema.js');

const getUserInfo = userName => User.findOne({ userName }).lean();

const getUserInfoWithId = userId => User.findById(userId).lean();

const getNotifyList = () =>
  User
    .find({}, {
      email: 1,
      displayName: 1,
      notificationStack: 1,
    })
    .where('notificationStack.0')
    .exists()
    .lean();

module.exports = {
  getUserInfo,
  getUserInfoWithId,
  getNotifyList,
};
