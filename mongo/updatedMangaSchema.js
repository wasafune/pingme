const mongoose = require('mongoose');

const updatedMangaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
});

module.exports = mongoose.model('UpdatedManga', updatedMangaSchema);
