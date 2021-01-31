import { gql } from "apollo-boost";


// Create a new user
export const addUserMutation = gql`
mutation($username:String!,$email:String!,$password:String!){
    addUser(username:$username,email:$email,password:$password){
        username
        id
    }
}
`
// Queries for a user by username
export const login = gql`
query($username:String!, $password:String!){
    login(username:$username, password:$password){
        id
        email
        username
        token
    }
}
`

