const graphql = require('graphql');



const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
} = graphql;

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        level: {type:GraphQLInt},
        nature: {type:GraphQLString},
    }),
})

module.exports = PokemonType;