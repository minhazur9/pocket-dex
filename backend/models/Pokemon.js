const mongoose = require('mongoose')

const PokemonSchema = mongoose.Schema({
    name: {
        type: String,
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    },
    nature: {
        type: String,
        default: 'Adamant'
    },
    teamId: {
        type: String,
        required: true
    }

})

const Pokemon = mongoose.model("Pokemon",PokemonSchema);

module.exports = Pokemon;