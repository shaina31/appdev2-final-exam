const transporter = require('../config/nodemailer');
const pug = require('pug');
const path = require('path');

exports.createEvent = async (req, res) => {
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
};
    