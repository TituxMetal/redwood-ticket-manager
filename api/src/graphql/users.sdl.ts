export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }
`
