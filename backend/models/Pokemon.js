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
    hpIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    atkIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    defIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    spAtkIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    spDefIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    spdIV: {
        type: Number,
        default: 0,
        min: 0,
        max: 31,
    },
    hpEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    atkEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    defEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    spAtkEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    spDefEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    spdEV: {
        type: Number,
        default: 0,
        min: 0,
        max: 252,
    },
    teamId: {
        type: String,
        required: true
    }

})

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;