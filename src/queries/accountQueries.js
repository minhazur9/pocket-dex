import { gql } from "apollo-boost";


// Create a new user
export const addUserMutation = gql`
mutation($username:String!,$email:String!,$password:String!){
    addUser(username:$username,email:$email,password:$password){
        token
    }
}
`
// Queries for a user by username
export const tokenAuthMutation = gql`
mutation($username:String!, $password:String!){
    tokenAuth(username:$username, password:$password){
        token
    }
}
`

