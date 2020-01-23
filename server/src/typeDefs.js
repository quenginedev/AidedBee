import { gql } from "apollo-server-express";

export default gql`
    type User{
        id: ID!,
        username: String,
        name: String!,
        email: String!,
        password: String!
    }
    # 5e219707da10f13eb05a7593
    type Query {
        user(id: ID): User!
        users: [User!]!
    },
    
    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
    }
`