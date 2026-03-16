const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, sessionsController.create);
router.get('/', authenticate, sessionsController.getAll);
router.get('/stats/today', authenticate, sessionsController.getToday);
router.get('/stats/weekly', authenticate, sessionsController.getWeekly);

module.exports = router;