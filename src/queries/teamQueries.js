import { gql } from "apollo-boost";

export const addTeamMutation = gql`
    mutation($name:String!,$userId:String!){
        addTeam(name:$name,userId:$userId){
            name
        }
    }
`


// export const getTeams = gql`
//     query($id:String!){

//     }
//     user(id:$id){
//         teams{
//             name{
//                 pokemon{
//                         name
//                 }
//             }
//         }
//     }
// `;

// export const getPokemonData = gql`
//     pokemon($id:String!){
//         name
//     }
// `;