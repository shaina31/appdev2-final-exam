const express = require('express');
const router = express.Router();

const {
  getAllEvents,
  createEvents,
  getMyEvents
} = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

router.get('/events', auth, getAllEvents);
router.post('/events', auth, createEvents);
router.get('/my-events', auth, getMyEvents);

module.exports = router;