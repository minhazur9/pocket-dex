const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',() => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.log(err);
  });


module.exports = {
    User: require('./User'),
    Team: require('./Team'),
    Pokemon: require('./Pokemon'),
}
  