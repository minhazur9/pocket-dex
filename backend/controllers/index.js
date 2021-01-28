const graphql = require('graphql');

const db = require('../models');

const UserType = require('./UserType');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString, 
    GraphQLID
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})