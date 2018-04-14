const mongoose = require('mongoose');

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
  subscribeList: [String],
  subscribeCount: Number,
  favoriteList: [String],
  favoriteCount: Number,
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
