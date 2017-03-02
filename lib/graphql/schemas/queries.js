'use strict';

module.exports = `

input UserInput {
  username: String!
  password: String!
}

input CreateSubjectInput {
  name: String!
}

input UpdateSubjectInput {
  id: ID!
  name: String!
}

input CreateRuleInput {
  _subject: ID!
  title: String!
  text: String!
}

input UpdateRuleInput {
  id: ID!
  _subject: ID
  title: String
  text: String
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

input CreateSheetInput {
  name: String!
  archetype: String!
  appearance: String
  skills: SkillsInput
  values: ValuesInput
  equipment: EquipmentInput
  specialisations: SpecialisationsInput
}

input UpdateSheetInput {
  id: ID
  name: String
  archetype: String
  appearance: String
  skills: SkillsInput
  values: ValuesInput
  equipment: EquipmentInput
  specialisations: SpecialisationsInput
}

type Query {
  users: [User]
  user(username: String): User
  rules: [Rule]
  rule(id: ID): Rule
  subjects: [Subject]
  subject(id: ID): Subject
  sheets: [Sheet]
  sheet(id: ID): Sheet
}

type Mutation {
  createUser(user: UserInput): User
  deleteUser(id: ID): User
  createSheet(sheet: CreateSheetInput): Sheet
  updateSheet(sheet: UpdateSheetInput): Sheet
  deleteSheet(id: ID): Sheet
  createRule(rule: CreateRuleInput): Rule
  updateRule(rule: UpdateRuleInput): Rule
  deleteRule(id: ID): Rule
  createSubject(subject: CreateSubjectInput): Subject
  updateSubject(subject: UpdateSubjectInput): Subject
  deleteSubject(id: ID): Subject
}

schema {
  query: Query
  mutation: Mutation
}

`;
