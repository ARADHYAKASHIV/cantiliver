const mongoose = require('mongoose');

const SavedArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const SavedArticle = mongoose.model('SavedArticle', SavedArticleSchema);

module.exports = SavedArticle;