'use strict';

module.exports = `
type User {
  id: String! # the ! means that every author object _must_ have an id
  username: String!
  password: String!
}

# the schema allows the following query:
type Query {
  users: [User]
}


# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;
