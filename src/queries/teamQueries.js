import { gql } from "apollo-boost";

export const addTeamMutation = gql`
    mutation($name:String!,$userId:ID!){
        addTeam(name:$name,userId:$userId){
            name
        }
    }
`


export const getTeamsQuery = gql`
    query($userId:ID!){
        allTeamsByUser(userId:$userId){
            name
            id
            pokemon{
                name
                id
            }
        }
    }
`;

export const editTeamMutation = gql`
    mutation($id:ID!,$name:String!){
        editTeam(id:$id,name:$name){
            name
        }
    }
`
export const editPokemonMutation = gql`
    mutation($id:ID!,$name:String!,$level:Int!,$nature:String!, $item:String!, $ability:String!, $moveset:[String!]!, $ivs: [Int!]!, $evs: [Int!]! ){
        editPokemon(id:$id,name:$name, level: $level, nature: $nature, item: $item, ability:$ability moveset: $moveset, ivs: $ivs, evs: $evs){
            name
        }
    }
`

export const getPokemonQuery = gql`
    query($id:ID!){
        pokemon(id:$id){
            name
            level
            nature
            item
            ability
            moveset
            ivs
            evs
            id
        }
    }
`