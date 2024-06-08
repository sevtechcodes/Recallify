const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const router = require('./router');
const connectDB = require('./models/db');
const PORT = 3000;

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// TODO  moved the env file here to protect it. Create a controller to serve this info to the frontend
// console.log('api key', process.env.VITE_FIREBASE_API_KEY)

// Set up static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
