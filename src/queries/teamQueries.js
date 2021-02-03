import { gql } from "apollo-boost";


export const getTeams = gql`
    user($id:String!){
        teams{
            name{
                pokemon{
                        name
                }
            }
        }
    }
`