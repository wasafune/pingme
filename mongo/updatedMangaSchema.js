const mongoose = require('mongoose');

const updatedMangaSchema = mongoose.Schema({
  mangaId: String,
  dbTitle: String,
});

const UpdatedManga = mongoose.model('UpdatedManga', updatedMangaSchema);

module.exports = UpdatedManga;
