const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Recallify';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI,  {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
