const graphql = require('graphql');

const db = require('../models');
const TeamType = require('./TeamType');

const {
    GraphQLObjectType,
    GraphQLString, 
    GraphQLID,
    GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        teams: {
            type: new GraphQLList(TeamType),
            resolve(parent,args) {
                return db.Team.find({userId:parent.id})
            }
        }

    })
})

module.exports = UserType;