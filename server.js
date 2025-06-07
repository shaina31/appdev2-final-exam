require('dotenv').config(); // Load .env first

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI environment variable is not defined');
  process.exit(1); // Stop the app if no MongoDB URI
}

// Debug: Confirm URI is loaded
console.log('Connecting to MongoDB with URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
