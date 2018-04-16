const mongoose = require('mongoose');

const updatedMangaSchema = mongoose.Schema({
  mangaId: String,
  dbTitle: String,
});

module.exports = mongoose.model('UpdatedManga', updatedMangaSchema);
