const Event = require('../models/Event');
const transporter = require('../config/nodemailer');
const pug = require('pug');
const path = require('path');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;

    const event = await Event.create({
      title,
      location,
      date,
      description,
      userId: req.user._id
    });

    const html = pug.renderFile(path.join(__dirname, '../emails/eventCreated.pug'), {
      title,
      location,
      date
    });

    await transporter.sendMail({
      to: req.user.email,
      subject: 'New Event Has Been Created',
      html
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
