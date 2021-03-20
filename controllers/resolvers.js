const db = require('../models');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const resolvers = {
    Query: {
        user: async (root, args) => {
            const decoded = await jwt.verify(args.id, JWT_SECRET)
            const { id } = decoded;
            return db.User.findById(id)
        },
        allTeamsByUser: async (root, args) => {
            const decoded = await jwt.verify(args.userId, JWT_SECRET)
            const { id } = decoded;
            return db.Team.find({ userId: id })
        },
        team: (root, args) => {
            return db.Team.findById(args.id)
        },
        pokemon: (root, args) => {
            return db.Pokemon.findById(args.id)
        }
    },
    User: {
        teams: (root, args) => {
            return db.Team.find({ userId: root.id })
        }
    },
    Team: {
        pokemon: (root, args) => {
            return db.Pokemon.find({ teamId: root.id })
        }
    },
    Mutation: {
        tokenAuth: async (root, args) => {
            const foundUser = await db.User.findOne({ $or: [{ email: args.email }, { username: args.username }] })
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
        },
        addUser: async (root, args) => {
            const regexp = new RegExp(/.*\@.*\.(com|org|gov|edu)/g);
            if (!args.email.match(regexp)) return { token: 'email is invalid' }
            const foundUser = await db.User.findOne({ $or: [{ email: args.email }, { username: args.username }] })
            if (foundUser && foundUser.username === args.username) return { token: 'username already exists' };
            else if (foundUser && foundUser.email === args.email) return { token: 'email already exists' }
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
        },
        addTeam: async (root, args) => {
            const decoded = await jwt.verify(args.userId, JWT_SECRET)
            const { id } = decoded;
            const team = await db.Team.create({
                name: args.name,
                userId: id,
            })
            const pokemonArr = new Array(6);
            const ivArr = new Array(6);
            const evArr = new Array(6);
            ivArr.fill(0);
            evArr.fill(0);
            pokemonArr.fill({ name: "", level: 1, nature: "hardy", ability: "", ivs: ivArr, evs: evArr, teamId: team._id }, 0, 6);
            return db.Pokemon.insertMany(pokemonArr)
        },
        editTeam: (parent, args) => {
            return db.Team.findByIdAndUpdate(
                args.id,
                { $set: { name: args.name } },
                { new: true })
        },
        deleteTeam: (parent, args) => {
            return db.Team.findByIdAndDelete(args.id)
                .then((foundTeam) => db.Pokemon.deleteMany({ teamId: foundTeam._id }))
        },
        editPokemon: (root, args) => {
            if (args.moveset.length > 4) return null;
            return db.Pokemon.findByIdAndUpdate(
                args.id,
                { $set: { name: args.name, level: args.level, nature: args.nature, item: args.item, ability: args.ability, moveset: args.moveset, ivs: args.ivs, evs: args.evs } },
                { new: true })
        }
    }
}

module.exports = resolvers;