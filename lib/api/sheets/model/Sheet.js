'use strict';

const Mongoose = require('mongoose');

const sheetModel = new Mongoose.Schema({
    name: String,
    archetype: String,
    appearance: String,
    skills: {
        fighting: Number,
        agility: Number,
        social: Number,
        learning: Number,
        tech: Number
    },
    values: {
        hitPoints: Number,
        movement: Number,
        socialStanding: Number
    },
    equipment: {
        large: String,
        normal: String,
        small: String
    },
    specialisations: {
        family: String,
        childhood: String,
        education: String,
        work: String
    }
},
{ timestamps: true });

module.exports = Mongoose.model('Sheet', sheetModel);
