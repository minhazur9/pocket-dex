import { gql } from "apollo-boost";

export const addTeamMutation = gql`
    mutation($name:String!,$userId:ID!){
        addTeam(name:$name,userId:$userId){
            name
        }
    }
`


export const getTeams = gql`
    query($id:ID!){
        user(id:$id){
            teams{
                name
            }
        }
    }
`;

// export const getPokemonData = gql`
//     pokemon($id:String!){
//         name
//     }
// `;