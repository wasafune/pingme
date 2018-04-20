const mongoose = require('mongoose');

const followingSchema = mongoose.Schema({
  _id: String,
  subscribed: Boolean,
});
const notifStackSchema = mongoose.Schema({
  _id: String,
  title: String,
  latest: Number,
});

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, require: true },
  age: { type: Number, min: 18, required: true },
  email: String,
  isVerified: Boolean,
  followingList: [followingSchema],
  followingCount: { type: Number, default: 0 },
  notifStack: [notifStackSchema],
  auth: Boolean,
  config: Object,
  firstName: String,
  admin: Boolean,
});

module.exports = mongoose.model('User', userSchema);
