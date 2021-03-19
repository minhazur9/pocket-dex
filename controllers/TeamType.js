const graphql = require('graphql');

const db = require('../models');
const PokemonType = require('./PokemonType');

const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLID,
    GraphQLList,
} = graphql;

const TeamType = new GraphQLObjectType({
    name: "Team",
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        pokemon: {
            type: new GraphQLList(PokemonType),
            resolve(parent,args) {
                return db.Pokemon.find({teamId:parent.id})
            }
        }
    })
})

module.exports = TeamType;