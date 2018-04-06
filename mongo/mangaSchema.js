const mongoose = require('mongoose');

const mangaSchema = mongoose.Schema({
  title: String,
  dbTitle: String,
  genres: [String],
  latest: Number,
  updated: { type: Date, default: Date.now },
  sources: [String],
  latestSources: [String],
  rating: { type: Number, default: 0 },
  subscribeCount: Number,
  favoriteCount: Number,
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
