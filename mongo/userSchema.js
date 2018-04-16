const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, require: true },
  age: { type: Number, min: 18, required: true },
  email: String,
  isVerified: Boolean,
  subscribedList: [String],
  subscribedCount: { type: Number, default: 0 },
  auth: Boolean,
  config: Object,
  firstName: String,
  admin: Boolean,
});

module.exports = mongoose.model('User', userSchema);
