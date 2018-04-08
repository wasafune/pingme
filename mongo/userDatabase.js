const mongoose = require("mongoose");
const { User } = require('./userSchema.js');

const DB_HOST = 'mongodb://localhost/testMongo';
mongoose.connect(DB_HOST);

const db = mongoose.connection;

const userInfo = new User({
  id: Math.floor(Math.random() * 100) + 1,
  userName: "username",
  password: "password",
  age: 20,
});

userInfo.save((err) => {
  if (err) console.log(err);
});

db.on("error", console.error.bind(console, 'MongoDB connection error:'));
