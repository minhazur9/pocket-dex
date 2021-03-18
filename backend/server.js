// Configuration
const express = require('express');
const session = require('express-session');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const schema = require('./controllers')

// Environment Variables
const PORT =  process.env.PORT || 4000;


// Middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use('/', graphqlHTTP({
    schema,
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
