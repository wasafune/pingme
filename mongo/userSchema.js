const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: Number,
  userName: {type: String, required: true},
  password: {type: String, require: true},
  age: { type: Number, min: 18, required: true },
  // email: String,
  // isVerified: Boolean,
  // subs: [Object],
  // auth: Boolean,
  // config: Object,
  // firstName: String,
  // admin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports =  User;