const graphql = require('graphql');

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
    })
})

module.exports = TeamType;