const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
  _id: String,
  subscribed: Boolean,
});

const mangaSchema = mongoose.Schema({
  title: String,
  htmlTitle: String,
  dbTitle: String,
  genres: [String],
  author: String,
  latest: Number,
  updated: { type: Date, default: Date.now() },
  completed: { type: Boolean, default: false },
  sources: [String],
  latestSources: [String],
  rating: { type: Number, default: 0 },
  followerList: [followerSchema],
  followerCount: { type: Number, default: 0 },
  favoritedList: [String],
  favoritedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Manga', mangaSchema);
