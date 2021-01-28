const graphql = require('graphql');

const db = require('../models');

const UserType = require('./UserType');
const TeamType = require('./TeamType');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString, 
    GraphQLID,
} = graphql;


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return db.User.findById(args.id)
            }
        },
        team: {
            type: TeamType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return db.Team.findById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {username: {type: GraphQLString}},
            resolve(parent,args) {
                return db.User.create({
                    username: args.username,
                })
            }
        },
        addTeam: {
            type: TeamType,
            args: {name:{type: GraphQLString}},
            resolve(parent,args) {
                return db.Team.create({
                    name: args.name
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})