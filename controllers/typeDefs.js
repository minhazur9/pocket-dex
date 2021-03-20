const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        teams: [Team]!
    }
    type Team {
        id: ID
        name: String
        pokemon: [Pokemon]
    }
    type Pokemon {
        id: ID
        name: String
        level: Int
        nature: String
        item: String
        ability: String
        moveset: [String]
        ivs: [Int]
        evs: [Int]
    }
    type Auth {
        username: String!,
        token: String!,
    }
    type Query {
        user(id:ID!): User!
        team(id:ID!) : Team!
        pokemon(id: ID!) : Pokemon!
        allTeamsByUser(userId:ID!): [Team]! 
    }
    type Mutation {
        tokenAuth(username:String!,email:String!,password:String!): Auth
        addUser(username:String!,email:String!,password:String!): Auth
        addTeam(name:String!,userId:ID!): Team
        editTeam(id:ID!,name:String!): Team
        deleteTeam(id:ID!): Team
        editPokemon(id: ID!, 
                    name: String!, 
                    level: Int,
                    nature: String,
                    item: String,
                    ability: String,
                    moveset: [String],
                    ivs: [Int], 
                    evs: [Int]) : Pokemon!
    }
`;

module.exports = typeDefs;