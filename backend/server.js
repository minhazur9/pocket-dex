// Configuration
require('dotenv').config({ path: "/home/min/Projects/pocket-dex/.env" });
const express = require('express');
const session = require('express-session');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();
const schema = require('./controllers')

// Environment Variables
const PORT = process.env.PORT || 4000;
const SECRET = process.env.SESSION_SECRET;

// Middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
