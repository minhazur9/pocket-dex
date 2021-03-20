// Configuration
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./controllers/typeDefs')
const resolvers = require('./controllers/resolvers')

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app, path: '/graphql' });

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
