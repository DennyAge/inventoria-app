import gql from "graphql-tag";

const userTypeDef = gql`
  type User {
    _id: ID!
    email: String!
    fullName: String!
    authentication: Authentication
    role: String!
    createdAt: String!
    updatedAt: String!
  }
  type Authentication {
    password: String!
    salt: String!
    sessionToken: String!
  }

  type Query {
    users: [User!]
    authUser: User
    user(userId: ID!): User
  }
  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    logout: LogoutResponse
  }
  input SignUpInput {
    fullName: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type LogoutResponse {
    message: String!
  }
`;

export default userTypeDef;
