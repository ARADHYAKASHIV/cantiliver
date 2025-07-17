const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SavedArticle = require('../models/SavedArticle');

// This is a placeholder for fetching news from an external API
// You will need to implement the logic to fetch from NewsAPI.org or NY Times API
router.get('/', async (req, res) => {
  // Fetch news from external API
  res.send({ message: 'This route will fetch news articles.' });
});

// Save an article
router.post('/save', auth, async (req, res) => {
  try {
    const { title, url, source, image, date } = req.body;
    const article = new SavedArticle({ title, url, source, image, date, user: req.user.userId });
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send({ error: 'Failed to save article' });
  }
});

// Get saved articles
router.get('/saved', auth, async (req, res) => {
  try {
    const articles = await SavedArticle.find({ user: req.user.userId });
    res.send(articles);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve saved articles' });
  }
});

module.exports = router;