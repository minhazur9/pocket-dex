const mongoose = require('mongoose')

const PokemonSchema = mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    level: {
        type: Number,
        default: 1,
        min: 1,
        max: 100
    },
    nature: {
        type: String,
        default: 'hardy',
    },
    ability: {
        type: String,
        default: "",
    },
    item: {
        type: String,
        default: "",
    },
    moveset: [
        {
            type: String,
            default: "",
        },
    ],

    ivs: [
        {
            type: Number,
            default: 0,
            min: 0,
            max: 31,
        }
    ],
    
    evs: [
        {
            type: Number,
            default: 0,
            min: 0,
            max: 252
        }
    ],
    teamId: {
        type: String,
        required: true
    }

})

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;