// Configuration
const express = require('express');
const session = require('express-session');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const methodOverride = require('method-override');
const morgan = require('morgan');


const app = express();
const schema = require('./controllers')

// Environment Variables
require('dotenv').config();
const PORT =  4000;

app.set('view-engine','ejs');


// Middleware
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
