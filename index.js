const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');
const users = require('./models/User');

mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const app = express();

// Load routes
require('./routes/authRoutes')(app);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT);