const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const router = require('./router');
const connectDB = require('./models/db');
// const bodyParser = require('body-parser');
const { PORT } = require('./config')

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set up static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
