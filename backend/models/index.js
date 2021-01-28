const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pocketDex',{
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
    Team: require('./Team')
}
  