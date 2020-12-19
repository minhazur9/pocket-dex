const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser = true,
    useFindAndModify = false,
    useCreateIndex = true,
    useUnifiedTopology = true
})

mongoose.connect.on('connected', () => {
    console.log('MongoDB connected successfully')
})

mongoose.connect.on('error', () => {
    console.log(err);
})
