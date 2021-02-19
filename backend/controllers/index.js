const graphql = require('graphql');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const db = require('../models');

const UserType = require('./UserType');
const TeamType = require('./TeamType');
const PokemonType = require('./PokemonType');
const AuthType = require('./AuthType');


const { JWT_SECRET } = process.env;

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
            async resolve(parent, args) {
                const decoded = await jwt.verify(args.id, JWT_SECRET)
                const { id } = decoded;
                return db.User.findById(id)
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
        allTeamsByUser: {
            type: new GraphQLList(TeamType),
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const decoded = await jwt.verify(args.userId, JWT_SECRET)
                const { id } = decoded;
                return db.Team.find({ userId: id })
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
            type: AuthType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const foundUser = await db.User.findOne({ $or: [{ email: args.email }, { username: args.username }] })
                if (foundUser) return null;
                const salt = await bycrypt.genSalt(10);
                const hashedPassword = await bycrypt.hash(args.password, salt);
                await db.User.create({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword,
                })
                const newUser = await db.User.findOne({ username: args.username })
                const { id } = newUser;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: '12h'
                })
                return { token }
            }
        },
        tokenAuth: {
            type: AuthType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const foundUser = await db.User.findOne({ username: args.username })
                if (!foundUser) return null
                const matched = await bycrypt.compare(args.password, foundUser.password)
                if (matched) {
                    const { id } = foundUser;
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: '12h'
                    })
                    return { token }
                }
                else return null
            }
        },
        // Adds new team to a user
        addTeam: {
            type: TeamType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const decoded = await jwt.verify(args.userId, JWT_SECRET)
                const { id } = decoded;
                const team = await db.Team.create({
                    name: args.name,
                    userId: id,
                })
                const pokemonArr = new Array(6);
                pokemonArr.fill({ name: "", level: 1, nature: "hardy", teamId: team._id }, 0, 6);
                db.Pokemon.insertMany(pokemonArr)
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: new GraphQLNonNull(GraphQLInt) },
                nature: { type: new GraphQLNonNull(GraphQLString) },
                item: { type: new GraphQLNonNull(GraphQLString) },
                moveset: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                if (args.moveset.length > 4) return null;
                return db.Pokemon.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name, level: args.level, nature: args.nature, item: args.item, moveset: args.moveset } },
                    { new: true })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})