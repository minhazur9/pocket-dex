// Configuration
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('body-parser');
const morgan = require('morgan');

const app = express();

// Environment Variables
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.set('view-engine','ejs');

// const ctrl = require('./controllers');

app.use(morgan('tiny'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})