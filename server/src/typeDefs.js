import { gql } from "apollo-server-express";

export default gql`
    type User{
        id: ID!,
        photoUrl: String,
        phoneNumber: String,
        displayName: String,
        type: String,
        email: String,
        password: String!,
        token: String
    }
    
    # 5e219707da10f13eb05a7593
    type Query {
        user(id: ID): User!
        users: [User!]!
    },
    
    type Mutation {
        createUserByEmailAndPassword(email: String!, password: String!): User!
        loginByEmail(email: String!, password: String!): User  
        loginByPhone(phone: String!, password: String!): User  
    }
`