const router = require('express').Router();
const { getDailyFact } = require('../controllers/factController');

router.route('/daily-fact').get(getDailyFact);

module.exports = router;