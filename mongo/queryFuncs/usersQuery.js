const User = require('../userSchema.js');

const getUserInfo = userName => User.findOne({ userName }).lean();

const getUserInfoWithId = userId => User.findById(userId).lean();


module.exports = {
  getUserInfo,
  getUserInfoWithId,
};
