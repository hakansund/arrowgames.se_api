'use strict';

const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const ruleModel = new Mongoose.Schema({
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true }
},
{ timestamps: true });

ruleModel.plugin(UniqueValidator);

module.exports = Mongoose.model('Rule', ruleModel);
