const graphql = require('graphql');

const db = require('../models');

const UserType = require('./UserType');
const TeamType = require('./TeamType');
const PokemonType = require('./PokemonType');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
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
        },
        pokemon: {
            type: PokemonType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return db.Pokemon.findById(args.id)
            }
        },
        allUsers: {
            type: new GraphQLList(UserType),
            resolve(parent,args) {
                return db.User.find({})
            }
        },
        allTeams: {
            type: new GraphQLList(TeamType),
            resolve(parent,args) {
                return db.Team.find({})
            }
        },
        allPokemon: {
            type: new GraphQLList(PokemonType),
            resolve(parent,args) {
                return db.Pokemon.find({})
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
            args: {
                name:{type: GraphQLString},
                userId:{type: GraphQLID}
            },
            resolve(parent,args) {
                return db.Team.create({
                    name: args.name,
                    userId: args.userId,
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
        },
        deleteTeam: {
            type: TeamType,
            args: {
                id: {type:GraphQLID}
            },
            resolve(parent,args) {
                return db.Team.findOneAndDelete({_id:args.id})
                .then((foundTeam) => db.Pokemon.deleteMany({teamId:foundTeam._id}))
            }
        },
        deletePokemon: {
            type: PokemonType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent,args) {
                return db.Pokemon.findOneAndDelete({_id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})