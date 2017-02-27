'use strict';

module.exports = `

input UserInput {
  username: String!
  password: String!
}

type Query {
  users: [User]
  user(username: String): User
  sheets: [Sheet]
}

type Mutation {
  createUser(user: UserInput): User
}

schema {
  query: Query
  mutation: Mutation
}

`;
