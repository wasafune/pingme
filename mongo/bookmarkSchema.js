const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
  source: String,
  title: String,
  dbTitle: String,
  latest: Number,
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
