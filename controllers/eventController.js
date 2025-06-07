const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('userId', 'name email');
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  const event = await Event.create({
    title,
    location,
    date,
    description,
    userId: req.user._id
  });

  req.eventData = event; // for email in Task 4
  res.status(201).json(event);
};

exports.getMyEvents = async (req, res) => {
  const events = await Event.find({ userId: req.user._id });
  res.json(events);
};
