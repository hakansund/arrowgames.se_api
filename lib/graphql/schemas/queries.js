'use strict';

module.exports = `

input UserInput {
  username: String!
  password: String!
}

input SkillsInput {
    fighting: Int
    agility: Int
    social: Int
    learning: Int
    tech: Int
}

input ValuesInput {
    hitPoints: Int,
    movement: Int,
    socialStanding: Int
}

input EquipmentInput {
    large: String,
    normal: String,
    small: String
}

input SpecialisationsInput {
    family: String,
    childhood: String,
    education: String,
    work: String
}

input SheetInput {
  name: String!
  archetype: String!
  appearance: String
  skills: SkillsInput
  values: ValuesInput
  equipment: EquipmentInput
  specialisations: SpecialisationsInput
}

type Query {
  users: [User]
  user(username: String): User
  sheets: [Sheet]
  sheet(id: ID): Sheet
}

type Mutation {
  createUser(user: UserInput): User
  createSheet(sheet: SheetInput): Sheet
}

schema {
  query: Query
  mutation: Mutation
}

`;
