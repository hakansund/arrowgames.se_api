'use strict';

const Mongoose = require('mongoose');

const sheetModel = new Mongoose.Schema({
    name: String,
    archetype: String,
    appearance: String,
    skills: {
        fighting: Number,
        movement: Number,
        social: Number,
        learning: Number,
        tech: Number
    }
});

module.exports = Mongoose.model('Sheet', sheetModel);
