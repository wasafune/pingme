const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const updatedMangaSchema = mongoose.Schema({
  _mangaId: ObjectId,
  dbTitle: String,
});

const UpdatedManga = mongoose.model('UpdatedManga', updatedMangaSchema);

module.exports = UpdatedManga;
