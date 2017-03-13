'use strict';

module.exports = `

type Rule {
  id: ID!
  title: String!
  text: String!
  createdAt: Float
  updatedAt: Float
}

type Subject {
  id: ID!
  name: String!
  rules: [Rule]
}

`;
