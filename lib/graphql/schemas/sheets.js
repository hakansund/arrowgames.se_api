'use strict';

module.exports = `

type Skills {
    fighting: Int
    agility: Int
    social: Int
    learning: Int
    tech: Int
}

type Values {
    hitPoints: Int,
    movement: Int,
    socialStanding: Int
}

type Equipment {
    large: String,
    normal: String,
    small: String
}

type Specialisations {
    family: String,
    childhood: String,
    education: String,
    work: String
}

type Sheet {
  id: ID!
  name: String!
  archetype: String!
  appearance: String
  skills: Skills
  values: Values
  equipment: Equipment
  specialisations: Specialisations
  createdAt: Float
  updatedAt: Float
}

`;
