const express = require('express');
const router = express.Router();

const {
  getAllEvents,
  createEvent,  // singular here, matches your import
  getMyEvents
} = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

router.get('/events', auth, getAllEvents);
router.post('/events', auth, createEvent);  // fixed here
router.get('/my-events', auth, getMyEvents);

module.exports = router;
