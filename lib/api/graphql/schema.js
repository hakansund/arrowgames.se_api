'use strict';

module.exports = `
type User {
  id: String!
  username: String!
  password: String!
}

type Query {
  users: [User]
}


schema {
  query: Query
}
`;
