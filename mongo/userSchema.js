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
  userName: { type: String, required: true },
  password: { type: String, require: true, select: false },
  age: { type: Number, min: 18, required: true },
  email: String,
  isVerified: Boolean,
  followingList: [followingSchema],
  followingCount: { type: Number, default: 0 },
  notificationStack: [notificationSchema],
  auth: Boolean,
  config: Object,
  firstName: String,
  admin: Boolean,
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
})

module.exports = mongoose.model('User', userSchema);
