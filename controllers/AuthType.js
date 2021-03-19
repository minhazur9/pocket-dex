const graphql = require('graphql');

const db = require('../models');

const {
    GraphQLObjectType,
    GraphQLString, 
} = graphql;

const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        username: {type: GraphQLString},
        token: {type:GraphQLString},
    })
})

module.exports = AuthType;