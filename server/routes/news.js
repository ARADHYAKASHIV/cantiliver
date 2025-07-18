const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SavedArticle = require('../models/SavedArticle');

const axios = require('axios');

// Fetch news from NewsAPI.org
router.get('/', async (req, res) => {
  try {
    const { category = 'general', page = 1, pageSize = 50 } = req.query;
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json({ articles: response.data.articles, totalResults: response.data.totalResults });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch news' });
  }
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