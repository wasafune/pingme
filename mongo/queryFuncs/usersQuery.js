const User = require('../userSchema.js');

const getUserInfo = userName => User.findOne({ userName }).lean();

const getUserInfoWithId = userId => User.findById(userId).lean();

const getNotifyList = () =>
  User
    .find()
    .where('notifications').equals(true)
    .where('notificationStack.0').exists()
    .select('+password email displayName notificationStack')
    .lean();

module.exports = {
  getUserInfo,
  getUserInfoWithId,
  getNotifyList,
};
