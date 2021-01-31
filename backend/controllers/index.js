const graphql = require('graphql');
const bycrypt = require('bcrypt')

const db = require('../models');

const UserType = require('./UserType');
const TeamType = require('./TeamType');
const PokemonType = require('./PokemonType');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql;


// Queries the database
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query for a user
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return db.User.findById(args.id)
            }
        },
        userByUsername: {
            type: UserType,
            args: { username: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return db.User.findOne({ username: args.username })
            }
        },
        // Query for a team
        team: {
            type: TeamType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return db.Team.findById(args.id)
            }
        },
        // Query for a pokemon
        pokemon: {
            type: PokemonType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return db.Pokemon.findById(args.id)
            }
        },
        // Query for all users
        allUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return db.User.find({})
            }
        },
        // Query for all teams
        allTeams: {
            type: new GraphQLList(TeamType),
            resolve(parent, args) {
                return db.Team.find({})
            }
        },
        // Query for all pokemon
        allPokemon: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args) {
                return db.Pokemon.find({})
            }
        }
    }
})

// Alters the database
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Adds new user to database
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                db.User.findOne({ $or: [{ email: args.email }, { username: args.username }] })
                    .then((foundUser) => {
                        if (foundUser) return 'Duplicate User Error';
                        return bycrypt.genSalt(10)
                            .then((salt) => bycrypt.hash(args.password, salt))
                            .then((hashedPassword) => db.User.create({
                                username: args.username,
                                email: args.email,
                                password: hashedPassword
                            }))
                            .catch((err) => console.log(err))
                    })
            }
        },
        // Adds new team to a user
        addTeam: {
            type: TeamType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return db.Team.create({
                    name: args.name,
                    userId: args.userId,
                })
            }
        },
        // Adds new pokemon to a team
        addPokemon: {
            type: PokemonType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: new GraphQLNonNull(GraphQLInt) },
                teamId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return db.Pokemon.create({
                    name: args.name,
                    level: args.level,
                    teamId: args.teamId,
                })
            }
        },
        // Deletes a user from the database
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return db.User.findByIdAndDelete(args.id)
                    .then(async (foundUser) => {
                        const foundTeams = await db.Team.find({ userId: foundUser._id });
                        await db.Team.deleteMany({ userId: foundUser._id });
                        return foundTeams;
                    })
                    .then((foundTeams) => {
                        const teamIds = foundTeams.map(({ _id }) => _id)
                        return db.Pokemon.deleteMany({ teamId: { $in: teamIds } })
                    })
            }
        },
        // Deletes a team from a user
        deleteTeam: {
            type: TeamType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return db.Team.findByIdAndDelete(args.id)
                    .then((foundTeam) => db.Pokemon.deleteMany({ teamId: foundTeam._id }))
            }
        },
        // Deletes a pokemon from a team
        deletePokemon: {
            type: PokemonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return db.Pokemon.findOneAndDelete({ _id: args.id })
            }
        },
        // Edits user information
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return db.User.findByIdAndUpdate(
                    args.id,
                    { $set: { username: args.username, email: args.email } },
                    { new: true })
            }
        },
        // Edits team information
        editTeam: {
            type: TeamType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return db.Team.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name } },
                    { new: true })
            }
        },
        // Edits pokemon information
        editPokemon: {
            type: PokemonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return db.Pokemon.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name } },
                    { new: true })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})