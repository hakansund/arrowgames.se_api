'use strict';

module.exports = `

type Rule {
  id: ID!
  _subject: String!
  title: String!
  text: String!
  createdAt: Float
  updatedAt: Float
}

type Subject {
  id: ID!
  name: String!
}

`;
