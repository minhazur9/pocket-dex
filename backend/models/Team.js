const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pokemon: [{
        type: String
    }],
    
},{timestamps:true})

const Team = mongoose.model('Team',TeamSchema)

module.exports = Team;

