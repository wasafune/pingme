
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const SALT = 10;

const followingSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  subscribed: Boolean,
});
const notificationSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  latest: Number,
});

const userSchema = mongoose.Schema({
  displayName: { type: String, required: true },
  password: { type: String, require: true, select: false },
  email: { type: String, required: true, unique: true },
  isVerified: Boolean,
  followingList: [followingSchema],
  followingCount: { type: Number, default: 0 },
  notificationStack: [notificationSchema],
  notifications: { type: Boolean, default: true },
  auth: Boolean,
  config: Object,
  firstName: String,
  admin: Boolean,
});


// older code to refactor
async function bcryptCB() {
  const user = this;
  if (!user.isModified('password')) return;
  const hash = await bcrypt.hash(user.password, SALT);
  user.password = hash;
}

userSchema.pre('save', bcryptCB);


module.exports = mongoose.model('User', userSchema);
