const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
  source: String,
  title: String,
  dbTitle: String,
  latest: Number,
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
