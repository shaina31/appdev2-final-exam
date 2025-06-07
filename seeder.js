const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const faker = require('faker');
const User = require('./models/User');
const Event = require('./models/Event');

const MONGODB_URI = process.env.MONGODB_URI;
const SALT_ROUNDS = 10;

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared old data');

    // Create users
    const users = [];
    const hashedPassword = await bcrypt.hash('secret123', SALT_ROUNDS);

    for (let i = 0; i < 5; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(await user.save());
    }

    console.log('Seeded 5 users');

    // Create events
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const event = new Event({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentences(2),
        userId: randomUser._id,
      });
      await event.save();
    }

    console.log('Seeded 10 events');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedDatabase();