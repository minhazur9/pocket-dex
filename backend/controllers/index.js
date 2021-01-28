const graphql = require('graphql');

const db = require('../models');

const UserType = require('./UserType');
const TeamType = require('./TeamType');
const PokemonType = require('./PokemonType');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString, 
    GraphQLID,
    GraphQLInt
} = graphql;


// Queries the database
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

// Alters the database
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
                    name: args.name,
                    teamId: args.teamId
                })
            }
        },
        addPokemon: {
            type: PokemonType,
            args: {
                name:{type:GraphQLString},
                level:{type:GraphQLInt},
                teamId: {type:GraphQLID},
            },
            resolve(parent, args) {
                return db.Pokemon.create({
                    name: args.name,
                    level: args.level,
                    teamId: args.teamId,
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})