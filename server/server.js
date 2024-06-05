const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const connectDB = require('./models/db');
const { PORT } = require('./config')


// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Router
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
