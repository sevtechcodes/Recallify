const mongoose = require('mongoose');
require('dotenv').config(); // This line loads the .env file

const mongoURI = process.env.MONGO_URI;
// const mongoURI = 'mongodb://localhost:27017/Recallify';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
