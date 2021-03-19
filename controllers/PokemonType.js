const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
} = graphql;

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        level: { type: GraphQLInt },
        nature: { type: GraphQLString },
        item: { type: GraphQLString },
        ability: { type: GraphQLString },
        moveset: { type: new GraphQLList(GraphQLString) },
        ivs: { type: new GraphQLList(GraphQLInt) },
        evs: { type: new GraphQLList(GraphQLInt) },
    }),
})

module.exports = PokemonType;