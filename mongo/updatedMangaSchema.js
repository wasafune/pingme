const mongoose = require('mongoose');

// const updatedMangaSchema = mongoose.Schema({
//   mangaId: String,
//   dbTitle: String,
// });

// const mangaSchema = mongoose.Schema({
//   title: String,
//   htmlTitle: String,
//   dbTitle: String,
//   genres: [String],
//   author: String,
//   latest: Number,
//   updated: { type: Date, default: Date.now() },
//   completed: { type: Boolean, default: false },
//   sources: [String],
//   latestSources: [String],
//   rating: { type: Number, default: 0 },
//   followerList: [followerSchema],
//   followerCount: { type: Number, default: 0 },
//   favoritedList: [String],
//   favoritedCount: { type: Number, default: 0 },
// });

const updatedMangaSchema = mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('UpdatedManga', updatedMangaSchema);
